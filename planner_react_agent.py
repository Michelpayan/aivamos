# planner.py

import os
import json
from typing import List, Dict
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.schema import Document
from google.generativeai import GenerativeModel,  genai
from datetime import datetime
import uuid
from memory import log_react_session

genai.configure(api_key="your-key")


# ---------------------------
# Load Gemini model
# ---------------------------

llm = GenerativeModel("gemini-2.5-flash")

# ---------------------------
# In-memory RAG setup
# ---------------------------
def build_vector_db_from_json(json_path: str = "oiq_scraped_data.json") -> FAISS:
    with open(json_path, "r", encoding="utf-8") as f:
        raw_docs = json.load(f)

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = []

    for entry in raw_docs:
        splits = splitter.split_text(entry["text"])
        for chunk in splits:
            docs.append({
                "source": entry["url"],
                "title": entry["title"],
                "content": chunk
            })

    langchain_docs = [
        Document(page_content=doc["content"], metadata={"source": doc["source"], "title": doc["title"]})
        for doc in docs
    ]

    embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return FAISS.from_documents(langchain_docs, embedding)

# Run vector similarity search
def run_vector_search(query: str, db: FAISS, k: int = 3) -> str:
    results = db.similarity_search(query, k=k)
    return "\n\n".join([doc.page_content[:700] for doc in results])


# ---------------------------
# ReAct Planner Function
# ---------------------------
def react_planner(user_profile: Dict, db: FAISS, log_dir="react_logs") -> str:
    session_id = str(uuid.uuid4())
    history: List[str] = []
    os.makedirs(log_dir, exist_ok=True)

    def log():
        log_react_session(session_id, user_profile, history, log_dir)

    for step in range(5):
        thought_prompt = "\n".join(history) + f"\nThought {step+1}: What should I find next to help this user?"
        thought = llm.generate_content(thought_prompt).text.strip()
        history.append(f"Thought {step+1}: {thought}")

        action_query = thought.replace("I should find", "").replace("I need to find", "").strip()
        observation = run_vector_search(action_query, db, k=2)
        history.append(f"Action {step+1}: Search('{action_query}')")
        history.append(f"Observation {step+1}: {observation}")

        log()

        if "generate final roadmap" in thought.lower() or step == 4:
            break

    # 🧠 Final Prompt Template
    context = "\n\n".join([h for h in history if h.startswith("Observation")])
    final_prompt = f"""
You are a supportive and knowledgeable career integration coach helping skilled immigrants become licensed professionals in Quebec.

Using the following context from the official Ordre des ingénieurs du Québec (OIQ), write a personalized roadmap for the following person:

- Name: {user_profile['name']}
- Country: {user_profile['country']}
- Profession: {user_profile['profession']}
- Education: {user_profile['education_level']}
- Experience: {user_profile['years_experience']} years
- Province: {user_profile['province']}

🌟 **INSTRUCTIONS:**

1. Start with a friendly greeting like:
   *"Hi [Name], as a [profession] from [country] with [X] years of experience and a [education] degree, I'm here to guide you through the process of becoming licensed in Quebec"*

2. Then break the process into **three numbered phases**, each with a clear title, and 3–5 bullet points inside each phase:
   - Use `### Phase 1: [Title]`
   - Use bullet points `•` for the steps

3. Make sure to **avoid repetition** like repeating "Regulatory Body: OIQ" in every step — assume it’s understood.

4. End with a friendly suggestion:
   *"Would you like me to generate a checklist or calendar roadmap to help you keep track?"*

5. Keep the tone encouraging and informative.

--- 
If there is any important URL, please specify it.
In case that there is information of costs or fees for any exam or application, please specify, otherwise ommit.

🧠 Context:
==========
{context}
==========
"""

    final_response = llm.generate_content(final_prompt).text.strip()
    history.append("Final Answer:\n" + final_response)
    log()
    return final_response
