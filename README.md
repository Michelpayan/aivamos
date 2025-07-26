# Agentic AI App Hackathon Template

Welcome! This repository is your starting point for the **Agentic AI App Hackathon**. It includes:

- A consistent folder structure  
- An environment spec (`environment.yml` or `Dockerfile`)  
- Documentation placeholders to explain your design and demo

## 📋 Submission Checklist

- [ ] All code in `src/` runs without errors  
- [ ] `ARCHITECTURE.md` contains a clear diagram sketch and explanation  
- [ ] `EXPLANATION.md` covers planning, tool use, memory, and limitations  
- [ ] `DEMO.md` links to a 3–5 min video with timestamped highlights  


# Skilled Immigrant Career Navigator

> An Agentic AI Web App for Personalized Canadian Immigration & Career Roadmaps  
> Built for the Google x ODSC Hackathon 2025

---

## Overview

This project empowers skilled immigrants to Canada with a **personalized, actionable roadmap** for validating their credentials and integrating into the Canadian job market.  
The app combines Google Gemini (2.5 Pro) for advanced reasoning and Google Custom Search for real-time authoritative resources, delivering guidance you can trust.

---

## Features

- **Conversational, multilingual form**: Supports English, Spanish, French, and Portuguese.
- **Personalized career roadmap**: AI-generated, step-by-step guidance tailored to each user’s profile.
- **Real-time verification**: Live web search returns official and up-to-date sources (government, regulators, universities).
- **Accessible UI**: Built with React and Tailwind CSS for clarity, mobile-friendliness, and ease of use.
- **No signup required**: Instant demo; no accounts or downloads.

---

## How It Works

1. **User completes a profile**  
   Name, nationality, profession, experience, province, and email.
2. **AI roadmap generation**  
   Google Gemini creates a tailored, sectioned career validation and integration plan.
3. **Web source enrichment**  
   Google Custom Search API fetches the most relevant, trustworthy links for the user's context.
4. **Results presentation**  
   The user receives both their personalized roadmap and live, clickable links—grounded, explainable, and actionable.

---

## Architecture

![Architecture Diagram](./A_flowchart_diagram_in_the_image_illustrates_an_ag.png)

- **Frontend**: React + TypeScript + Tailwind
- **AI Reasoning**: Google Gemini 2.5 Pro API
- **Web Search**: Google Custom Search API (CSE)
- **Session Memory**: All data is held in session state (no backend)

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for more details.

---

## Getting Started

### **Prerequisites**

- Node.js 18+
- NPM
- Google Gemini API key
- Google Custom Search API key & CX

### **Setup**

1. **Clone this repository**

   ```bash
   git clone https://github.com/yourusername/skilled-immigrant-path.git
   cd skilled-immigrant-path

2. **Install dependencies**

 bash
CopyEdit
npm install

3. **Create a .env file in the project root and add:**

 env
CopyEdit
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_CSE_API_KEY=your_google_cse_api_key
VITE_GOOGLE_CSE_CX=your_google_cse_cx

4. **Start the development server**

 bash
CopyEdit
npm run dev

5. **Open your browser at http://localhost:5173 (or as indicated in terminal).**


Contributing
Pull requests are welcome!
 If you wish to contribute or adapt this project for other migration scenarios or countries, open an issue or start a discussion.

License
MIT

Credits
Google x ODSC Hackathon Team


Google Gemini


Google Programmable Search Engine


React, Tailwind CSS, Typescript



Empowering newcomers. Grounding AI advice with real-world sources.



## 📂 Folder Layout

![Folder Layout Diagram](images/folder-githb.png)



## 🏅 Judging Criteria

- **Technical Excellence **  
  This criterion evaluates the robustness, functionality, and overall quality of the technical implementation. Judges will assess the code's efficiency, the absence of critical bugs, and the successful execution of the project's core features.

- **Solution Architecture & Documentation **  
  This focuses on the clarity, maintainability, and thoughtful design of the project's architecture. This includes assessing the organization and readability of the codebase, as well as the comprehensiveness and conciseness of documentation (e.g., GitHub README, inline comments) that enables others to understand and potentially reproduce or extend the solution.

- **Innovative Gemini Integration **  
  This criterion specifically assesses how effectively and creatively the Google Gemini API has been incorporated into the solution. Judges will look for novel applications, efficient use of Gemini's capabilities, and the impact it has on the project's functionality or user experience. You are welcome to use additional Google products.

- **Societal Impact & Novelty **  
  This evaluates the project's potential to address a meaningful problem, contribute positively to society, or offer a genuinely innovative and unique solution. Judges will consider the originality of the idea, its potential real‑world applicability, and its ability to solve a challenge in a new or impactful way.


