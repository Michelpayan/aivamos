# executor.py
"""
CLI runner to test the live‑Google‑search planner.
Replace this with a FastAPI/Flask endpoint in production.
"""
from planner_react_agent import react_planner

if __name__ == "__main__":
    print("👋 Welcome to the Skilled Immigrant Licensing Assistant!\n")

    profile = {
        "name": input("Enter your name: "),
        "country": input("Country of origin: "),
        "profession": input("Profession (e.g., Engineer): "),
        "education_level": input("Highest education level (e.g., Bachelor's, Master's): "),
        "years_experience": int(input("Years of professional experience: ")),
        "province": input("Target Canadian province (e.g., Quebec): "),
    }

    print("\n🔍 Searching the web and generating your roadmap...\n")
    roadmap = react_planner(profile)
    print("📋 Personalized Roadmap\n")
    print(roadmap)

