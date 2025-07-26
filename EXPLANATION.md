# Technical Explanation

## 1. Agent Workflow

1. **Receive user input**  
   `fullName`, `profession`, `nationality`, `yearsExperience`, `province`, `email`.

2. **Validate & log**  
   - Check required fields.  
   - Write an initial session entry to `react_logs/<session‑id>.json`.

3. **Build a search query (no RAG)**  
   Compose a free‑text query such as:  how to become a licensed <profession> in <province> Canada
<yearsExperience> years experience foreign‑trained <nationality>


4. **Call **Google Custom Search API**  
- Retrieve the top N snippets / URLs (fresh web data).  
- Append them as “Observation 1” to the session log.

5. **Craft a structured prompt for **Gemini API**  
- Embed the user profile, the JSON output schema, and the snippets.  
- Add guardrails: “Respond with **valid JSON only** that matches the schema.”

6. **Invoke Gemini (temperature 0.2)**  
Gemini returns a roadmap object (summary, differences, credential steps, etc.).

7. **Parse & post‑process**  
- Strip code‑fence markers, parse JSON.  
- If parsing fails, fall back to a bilingual hand‑crafted template.  
- Ensure every required key exists; patch checklist into an array.

## 2. Planning & Approach

The objective was to design a high-impact Agentic AI application that delivers actionable, trustworthy career guidance for skilled immigrants in Canada. Our process focused on three principles:

1. **User-Centric Flow:**  
   We began with journey mapping from a user’s perspective:  
   - What information would a newcomer need to succeed?  
   - How can we deliver not just AI advice, but *verifiable* steps and real links?

2. **Agentic Reasoning:**  
   We planned a multi-step agent workflow:  
   - Collect user profile  
   - Use Gemini AI for stepwise roadmap generation  
   - Use Google Custom Search API for real-world, up-to-date validation  
   - Merge both streams for a trustworthy, “grounded” experience

3. **Rapid Prototyping:**  
   Built with React, modular components, and live API keys (not static mocks) to allow fast iteration.

## 3. Tool Use

- **Google Gemini API (2.5 Pro):**  
  Used for zero-shot, high-level reasoning, and personalized roadmap creation. The prompt is dynamically generated from user inputs, and Gemini responds with a clear, stepwise plan (differences, credentialing, training, alternatives, checklist).

- **Google Custom Search API:**  
  Used as an external web agent to search the open web for authoritative sources. The app queries for credentialing and regulatory information based on user profile (profession + province), retrieving up-to-date, ranked results.

- **Frontend (React + Tailwind):**  
  Modular, multilingual form and results presentation. Easy to iterate and demo.

## 4. Memory & Context

- **Session-Based Memory:**  
  The app holds the user’s profile and the AI response in session state only (no backend, no persistent storage).

- **AI Context Management:**  
  All relevant user data is injected into a single Gemini prompt per interaction. This prompt includes:  
  - User’s name, nationality, profession, experience, province  
  - Requested language  
  - Structured instructions for the AI to generate multi-section output

- **Search Context:**  
  The same user profile is also used to generate a focused search query for the Google CSE, ensuring that returned sources directly match the user's needs.

- **No Cross-Session Memory:**  
  For privacy and demo simplicity, once the user leaves the session or refreshes, their data is gone.

## 5. Limitations

1. **No Persistent User Accounts:**  
   There is no backend database or login. Each session is ephemeral.

2. **API Rate Limits:**  
   Free API tiers may be subject to rate limits or quotas; abuse may result in failed requests.

3. **Source Verification:**  
   Google Custom Search returns the most relevant public links, but does not guarantee 100% government or regulatory pages. For production, the search engine should be further restricted or validated.

4. **Prompt Reliance:**  
   Gemini’s output quality depends on prompt design and may occasionally hallucinate or give generic advice.

5. **No Document Upload/Parsing:**  
   The current MVP only supports form-based profile input; parsing of real credentials or diplomas is out of scope.

6. **Language Support:**  
   The UI is multilingual, but Gemini's answers may vary in translation quality based on the selected language.

7. **UI/UX Simplification:**  
   For the hackathon, emphasis was on speed and clarity, not advanced onboarding or accessibility.

---

## Conclusion

This app demonstrates how agentic AI—when paired with real-time web search—can offer not only answers but *justification*, helping users trust, verify, and act on their personalized roadmap to success in a new country.

