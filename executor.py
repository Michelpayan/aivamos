from planner_react_agent import react_planner, build_vector_db_from_json

# Example CLI to test the full pipeline
if __name__ == "__main__":
    print("👋 Welcome to the Skilled Immigrant Licensing Assistant!")

    user_profile = {
        "name": input("Enter your name: "),
        "country": input("Country of origin: "),
        "profession": input("Profession (e.g., Engineer): "),
        "education_level": input("Highest education level (e.g., Bachelor's, Master's): "),
        "years_experience": int(input("Years of professional experience: ")),
        "province": input("Target Canadian province (e.g., Quebec): ")
    }

 
    db = build_vector_db_from_json()
    response = react_planner(user_profile, db)

    print(response)
    