# planner_react_agent.py

import os, uuid, json
from typing import Dict, List
from datetime import datetime
from google.generativeai import GenerativeModel, genai
from google_search import google_custom_search
from memory import log_react_session



# ---- Gemini setup ----------------------------------------------------------
genai.configure(api_key=os.getenv("GOOGLE_API_KEY", "YOUR_GEMINI_KEY"))
llm = GenerativeModel("gemini-2.5-flash")


# ---- Build an initial open‑web query --------------------------------------
def build_initial_query(p: Dict) -> str:
    return (
        f"how to become a licensed {p['profession']} in {p['province']} Canada "
        f"{p['education_level']} {p['years_experience']} years experience "
        f"foreign trained {p['country']}"
    )

# ---- ReAct planner --------------------------------------------------------
def react_planner(user_profile: Dict, log_dir: str = "react_logs") -> str:
    os.makedirs(log_dir, exist_ok=True)
    session_id = str(uuid.uuid4())
    history: List[str] = []

    def log():  # save steps to disk
        log_react_session(session_id, user_profile, history, log_dir)

    # ReAct loop -------------------------------------------------------------
    for step in range(5):
        if step == 0:  # first search
            action_query = build_initial_query(user_profile)
            thought = "I should gather general licensing steps."
        else:
            thought_prompt = (
                "\n".join(history)
                + f"\nThought {step+1}: Based on what I know, what should I search next?"
            )
            thought = llm.generate_content(thought_prompt).text.strip()
            action_query = (
                thought.replace("I should find", "")
                .replace("I need to find", "")
                .strip()
            )

        history.append(f"Thought {step+1}: {thought}")
        observation = google_custom_search(action_query, num=8)
        history.append(f"Action {step+1}: GoogleSearch('{action_query}')")
        history.append(f"Observation {step+1}: {observation}")
        log()

        if "generate final roadmap" in thought.lower() or step == 4:
            break

    # Build context and final prompt ----------------------------------------
    context = "\n\n".join(
        h for h in history if h.startswith("Observation")
    )

    final_prompt = f"""
You are a supportive and knowledgeable career integration coach helping skilled immigrants become licensed professionals in Quebec.

Using the live web snippets below, write a personalized roadmap for the following person:

- Name: {user_profile['name']}
- Country: {user_profile['country']}
- Profession: {user_profile['profession']}
- Education: {user_profile['education_level']}
- Experience: {user_profile['years_experience']} years
- Province: {user_profile['province']}

🌟 **INSTRUCTIONS:**
1. Start with a friendly greeting.
2. Provide 3 numbered phases (### headings, • bullet points).
3. Avoid repeating “Regulatory Body: OIQ” every step.
4. End by asking if they want a checklist or calendar.
5. Mention key URLs or fees if they appear in snippets.

🧠 Context (Google snippets):
============================
{context}
============================
"""
    roadmap = llm.generate_content(final_prompt).text.strip()
    history.append("Final Answer:\n" + roadmap)
    log()
    return roadmap
