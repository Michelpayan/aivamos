import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    console.log("=== API route started ===")

    // Check if API key is available
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      console.error("Google AI API key is missing")
      return NextResponse.json(
        {
          error: "API configuration error",
          details:
            "Google AI API key is not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    console.log("API key found")

    // Parse request body
    let formData
    try {
      formData = await request.json()
      console.log("Form data received:", {
        fullName: formData.fullName,
        nationality: formData.nationality,
        profession: formData.profession,
        yearsExperience: formData.yearsExperience,
        province: formData.province,
        language: formData.language,
      })
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid request",
          details: "Request body must be valid JSON",
        },
        { status: 400 },
      )
    }

    // Validate required fields
    const requiredFields = ["fullName", "nationality", "profession", "yearsExperience", "province"]
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.error(`Missing required field: ${field}`)
        return NextResponse.json(
          {
            error: "Validation error",
            details: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Get language
    const language = formData.language || "en"
    const languageMap: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      pt: "Portuguese",
    }
    const fullLanguage = languageMap[language] || "English"
    console.log("Using language:", fullLanguage)

    // Create a simpler, more reliable prompt
    const prompt = `You are a career advisor for skilled immigrants in Canada. Create a roadmap for this person:

Name: ${formData.fullName}
From: ${formData.nationality}  
Profession: ${formData.profession}
Experience: ${formData.yearsExperience} years
Province: ${formData.province}

Respond ONLY with valid JSON in this exact format:

{
  "summary": "Welcome message and brief overview",
  "professionalDifferences": "Explain in 2-4 sentences the main differences between practicing this profession in the user's home country and in the selected Canadian province. Cover regulations, legal requirements, workplace culture, language, tools/software used, and professional standards.",
  "credentialValidation": "List each key step required to validate the profession in the province. For every step, include: step name, short description (what is done and why), approximate cost in CAD, estimated processing time, the regulatory body name (and a link if possible), and a practical tip (common mistakes to avoid or useful resources). Format as clear, distinct steps or paragraphs with costs and times clearly marked.",
  "recommendedTraining": "Suggest 3-4 relevant courses or programs (online, college/university, certifications, or free/subsidized courses in the province), each with a brief explanation of why they help improve the user's opportunities and any language requirements. Include links wherever possible.",
  "alternativeJobs": "List 3-4 specific job titles that can provide Canadian experience or income while the user completes validation. For each, briefly explain how the role supports career progression and include a job board or association link if available.",
  "checklist": [
    "First prioritized actionable task - be specific",
    "Second actionable task - be specific",
    "Third actionable task - be specific",
    "Fourth actionable task - be specific",
    "Fifth actionable task - be specific",
  ]
}

Language: ${fullLanguage}
Keep responses concise and practical. Return only the JSON object.`

    console.log("=== Calling Gemini API ===")

    // Call Gemini API
    let geminiResponse
    try {
      geminiResponse = await generateText({
        model: google("gemini-2.0-flash-exp", {
          apiKey: apiKey,
        }),
        prompt,
        temperature: 0.1,
      })
      console.log("Gemini API call successful")
    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError)
      return NextResponse.json(
        {
          error: "AI Service Error",
          details: "Failed to generate roadmap content. Please try again.",
        },
        { status: 503 },
      )
    }

    const text = geminiResponse.text
    console.log("Response length:", text.length)
    console.log("First 200 chars:", text.substring(0, 200))

    // Parse JSON response
    let result
    try {
      // Clean the response
      let cleanedText = text.trim()

      // Remove markdown code blocks if present
      cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

      // Find JSON boundaries
      const jsonStart = cleanedText.indexOf("{")
      const jsonEnd = cleanedText.lastIndexOf("}")

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1)
        result = JSON.parse(jsonString)
        console.log("JSON parsed successfully")
      } else {
        throw new Error("No valid JSON found")
      }
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError)

      // Create fallback response
      result = {
        summary: `Hello ${formData.fullName}! As a ${formData.profession} from ${formData.nationality} with ${formData.yearsExperience} years of experience in ${formData.province}, here's your personalized career roadmap for Canada.`,

        professionalDifferences: "Working as a ${formData.profession} in ${formData.province} requires understanding local regulations, professional standards, and workplace culture. Explain in 2-4 sentences the main differences between practicing this profession in the user's home country and in the selected Canadian province. Cover regulations, legal requirements, workplace culture, language, tools/software used, and professional standards.",

        credentialValidation: "List each key step required to validate the profession in the province. For every step, include: step name, short description (what is done and why), approximate cost in CAD, estimated processing time, the regulatory body name (and a link if possible), and a practical tip (common mistakes to avoid or useful resources). Format as clear, distinct steps or paragraphs with costs and times clearly marked.",

        recommendedTraining: "Suggest 3-4 relevant courses or programs (online, college/university, certifications, or free/subsidized courses in the province), each with a brief explanation of why they help improve the user's opportunities and any language requirements. Include links wherever possible.",
        
        alternativeJobs: "List 3-4 specific job titles that can provide Canadian experience or income while the user completes validation. For each, briefly explain how the role supports career progression and include a job board or association link if available.",

        checklist: [
          `Research the regulatory body for ${formData.profession} in ${formData.province}`,
          "Gather all educational and professional documents",
          "Get documents translated and notarized if needed",
          "Apply for credential assessment",
          "Update resume to Canadian standards",
          "Start networking with local professionals",
        ],
      }
    }

    // Validate result structure
    const requiredKeys = [
      "summary",
      "professionalDifferences",
      "credentialValidation",
      "recommendedTraining",
      "alternativeJobs",
      "checklist",
    ]

    for (const key of requiredKeys) {
      if (!result[key]) {
        result[key] = key === "checklist" ? [] : `Information about ${key} will be provided.`
      }
    }

    // Ensure checklist is array
    if (!Array.isArray(result.checklist)) {
      result.checklist = []
    }

    console.log("=== Returning successful response ===")
    return NextResponse.json(result)
  } catch (error) {
    console.error("=== Unexpected error ===", error)

    return NextResponse.json(
      {
        error: "Server Error",
        details: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
