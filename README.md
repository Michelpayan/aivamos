# Skilled Immigrant Career Navigator

> **An Agentic AI Web App for Personalized Canadian Immigration & Career Roadmaps**  
> _Built for the Google x ODSC Hackathon 2025_

---

## 🚀 Overview

**Skilled Immigrant Career Navigator** empowers newcomers to Canada by generating a _personalized, actionable roadmap_ for validating credentials and integrating into the job market—instantly, in their language, and tailored to their real background.

Our app combines **Google Gemini** for advanced AI reasoning and **Google Custom Search** for real-time, authoritative web resources. The result? Reliable, step-by-step guidance grounded in official sources and delivered through an accessible, agentic user experience.

---

## 🎥 Demo Video

[![Watch the demo on YouTube](https://img.youtube.com/vi/z95z6rIUo_0/0.jpg)](https://www.youtube.com/watch?v=z95z6rIUo_0)  
**[▶️ Watch the demo video here](https://www.youtube.com/watch?v=z95z6rIUo_0)**

- 00:00 – Introduction & Setup  
- 00:30 – User Input → Planning step  
- 01:30 – Tool calls & memory retrieval  
- 02:30 – Final output & edge-case handling  

---

## ✨ Features

- **Conversational, multilingual interface:** English, Spanish, French, and Portuguese.
- **Personalized career roadmap:** AI-generated, step-by-step guidance for each user’s real profile.
- **Real-time verification:** Live Google Custom Search returns up-to-date links from government, regulators, and universities.
- **Accessible UI:** React + Tailwind CSS for clarity, mobile-friendliness, and ease of use.
- **No signup required:** Try the demo instantly—no accounts or downloads.

---

## 🧩 How It Works

1. **User completes a profile**  
   _Name, nationality, profession, years of experience, province, and email._

2. **AI roadmap generation**  
   _Google Gemini generates a sectioned, tailored roadmap for credential recognition and labor market integration._

3. **Web source enrichment**  
   _Google Custom Search API finds official, trustworthy links personalized to the user's context._

4. **Results presentation**  
   _Users receive both their personalized roadmap and clickable links—grounded, explainable, and actionable._

---

## 🏗️ Architecture

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for diagrams and more details.

---

## 📋 Submission Checklist

- [x] All code in `src/` runs without errors
- [x] `ARCHITECTURE.md` contains a clear diagram and explanation
- [x] `EXPLANATION.md` covers planning, tool use, memory, and limitations
- [x] `DEMO.md` links to a 3–5 min video with timestamped highlights

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- NPM
- Google Gemini API key
- Google Custom Search API key & CX

### Setup

1. **Clone this repository**
    ```bash
    git clone https://github.com/Michelpayan/aivamos.git
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Create a `.env` file in the project root and add:**
    ```
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_GOOGLE_CSE_API_KEY=your_google_cse_api_key
    VITE_GOOGLE_CSE_CX=your_google_cse_cx
    ```

4. **Start the development server**
    ```bash
    npm run dev
    ```

5. **Open your browser at** `http://localhost:5173` _(or as indicated in the terminal)_.

---

## 🤝 Contributing

Pull requests are welcome!  
Want to adapt this project for other migration scenarios or countries? Open an issue or start a discussion.

---

## 📝 License

[MIT](./LICENSE)

---

## 🙏 Credits

- Google x ODSC Hackathon Team
- Google Gemini
- Google Programmable Search Engine
- React, Tailwind CSS, Typescript

---

_Empowering newcomers. Grounding AI advice with real-world sources._
