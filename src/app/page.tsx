"use client"

import { useState } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import WelcomeScreen from "@/components/welcome-screen"
import ConversationalForm from "@/components/conversational-form"
import ResultsScreen from "@/components/results-screen"
import Footer from "@/components/footer"

export type UserData = {
  fullName: string
  nationality: string
  profession: string
  yearsExperience: number
  province: string
  email: string
}

export type RoadmapResult = {
  summary: string
  professionalDifferences: string
  credentialValidation: string
  recommendedTraining: string
  alternativeJobs: string
  checklist: string[]
}

function CareerNavigatorContent() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "form" | "results">("welcome")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [roadmapResult, setRoadmapResult] = useState<RoadmapResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = () => {
    setCurrentStep("form")
    setError(null)
  }

  const handleFormSubmit = async (data: UserData, language: string) => {
    setUserData(data)
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting form data:", { ...data, language })

      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          language: language,
        }),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      // Get the raw response text first
      const responseText = await response.text()
      console.log("Raw response:", responseText.substring(0, 500))

      if (!response.ok) {
        console.error("API Error - Status:", response.status)
        console.error("API Error - Response:", responseText)

        // Try to parse error as JSON, fallback to text
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.details || errorData.error || errorMessage
        } catch {
          errorMessage = responseText || errorMessage
        }

        throw new Error(errorMessage)
      }

      // Try to parse the response as JSON
      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError)
        console.error("Response that failed to parse:", responseText)
        throw new Error("Invalid response format from server. Please try again.")
      }

      console.log("API Response parsed successfully:", Object.keys(result))

      // Validate the result structure
      if (!result || typeof result !== "object") {
        throw new Error("Invalid response format from API")
      }

      // Ensure all required fields exist
      const roadmapData: RoadmapResult = {
        summary: result.summary || "Welcome! Here's your personalized roadmap.",
        professionalDifferences:
          result.professionalDifferences || "Professional requirements may vary between countries.",
        credentialValidation:
          result.credentialValidation || "Contact relevant professional bodies for credential validation.",
        recommendedTraining: result.recommendedTraining || "Consider professional development courses in your field.",
        alternativeJobs: result.alternativeJobs || "Explore related positions in your industry.",
        checklist: Array.isArray(result.checklist)
          ? result.checklist
          : [
              "Research professional requirements",
              "Gather required documents",
              "Contact professional bodies",
              "Apply for credential evaluation",
            ],
      }

      setRoadmapResult(roadmapData)
      setCurrentStep("results")
    } catch (error) {
      console.error("Error generating roadmap:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setError(`Failed to generate roadmap: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateAnother = () => {
    setCurrentStep("welcome")
    setUserData(null)
    setRoadmapResult(null)
    setError(null)
  }

  const handleRetry = () => {
    if (userData) {
      // Get the language from the form or default to 'en'
      handleFormSubmit(userData, "en")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        {currentStep === "welcome" && <WelcomeScreen onStart={handleStart} />}
        {currentStep === "form" && (
          <>
            <ConversationalForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            {error && (
              <div className="max-w-2xl mx-auto px-4 pb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleRetry}
                          className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {currentStep === "results" && roadmapResult && userData && (
          <ResultsScreen result={roadmapResult} userData={userData} onGenerateAnother={handleGenerateAnother} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default function CareerNavigator() {
  return (
    <LanguageProvider>
      <CareerNavigatorContent />
    </LanguageProvider>
  )
}
