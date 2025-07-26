"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import type { RoadmapResult, UserData } from "@/app/page"
import {
  Download,
  Mail,
  RefreshCw,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ExternalLink,
  Building2,
  DollarSign,
  GraduationCap,
  Briefcase,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ResultsScreenProps {
  result: RoadmapResult
  userData: UserData
  onGenerateAnother: () => void
}

export default function ResultsScreen({ result, userData, onGenerateAnother }: ResultsScreenProps) {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const handleChecklistToggle = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Your roadmap PDF would be downloaded here.",
    })
  }

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Your roadmap has been sent to ${userData.email}`,
    })
  }

  const handleEditInfo = () => {
    // This would go back to the form with pre-filled data
    toast({
      title: "Edit Information",
      description: "This would allow you to edit your information.",
    })
  }

  // Parse credential validation steps to extract costs and times
  const parseCredentialSteps = (content: string | undefined) => {
    if (!content || typeof content !== "string") {
      return [
        {
          text: "Contact the relevant professional regulatory body to begin validation",
          cost: null,
          time: null,
        },
      ]
    }

    const lines = content.split("\n").filter((line) => line.trim())
    if (lines.length === 0) {
      return [
        {
          text: content.trim(),
          cost: null,
          time: null,
        },
      ]
    }

    return lines.map((line) => {
      const costMatch = line.match(/\$(\d+(?:,\d+)?(?:-\d+(?:,\d+)?)?)\s*(?:CAD)?/i)
      const timeMatch = line.match(/(\d+(?:-\d+)?)\s*(days?|weeks?|months?|years?)/i)

      return {
        text: line.replace(/^[-•*]\s*/, "").trim(),
        cost: costMatch ? costMatch[0] : null,
        time: timeMatch ? `${timeMatch[1]} ${timeMatch[2]}` : null,
      }
    })
  }

  // Parse training recommendations
  const parseTrainingItems = (content: string | undefined) => {
    if (!content || typeof content !== "string") {
      return ["Consider professional development courses in your field"]
    }

    const lines = content.split("\n").filter((line) => line.trim())
    if (lines.length === 0) {
      return [content.trim()]
    }

    return lines.map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean)
  }

  // Parse alternative jobs
  const parseAlternativeJobs = (content: string | undefined) => {
    if (!content || typeof content !== "string") {
      return ["Related positions in your industry", "Entry-level opportunities", "Consulting roles"]
    }

    const lines = content.split("\n").filter((line) => line.trim())
    if (lines.length === 0) {
      return [content.trim()]
    }

    return lines.map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean)
  }

  const credentialSteps = parseCredentialSteps(result.credentialValidation)
  const trainingItems = parseTrainingItems(result.recommendedTraining)
  const alternativeJobs = parseAlternativeJobs(result.alternativeJobs)

  return (
    <div className="min-h-screen bg-white">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
          <span className="text-sm font-medium text-[#0B3954]">{language.toUpperCase()}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0B3954] mb-4">
            {language === "es" ? "Tu Roadmap Profesional" : "Your Professional Roadmap"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "es"
              ? `Basado en tu perfil como ${userData.profession} de ${userData.nationality} con ${userData.yearsExperience} años de experiencia en ${userData.province}`
              : `Based on your profile as a ${userData.profession} from ${userData.nationality} with ${userData.yearsExperience} years of experience in ${userData.province}`}
          </p>
        </div>

        <div className="space-y-8">
          {/* Professional Differences */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-[#0B3954]" />
              <h2 className="text-xl font-bold text-[#0B3954]">
                {language === "es" ? "Diferencia Profesional" : "Professional Differences"}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{result.professionalDifferences}</p>
          </div>

          {/* Credential Validation */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-[#0B3954]" />
              <h2 className="text-xl font-bold text-[#0B3954]">
                {language === "es" ? "Validación de Credenciales" : "Credential Validation"}
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              {language === "es"
                ? `Para validar tu profesión en ${userData.province}, necesitarás:`
                : `To validate your profession in ${userData.province}, you will need:`}
            </p>
            <div className="space-y-3">
              {credentialSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1ABC9C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-700">{step.text}</span>
                    {(step.cost || step.time) && (
                      <div className="text-sm text-gray-500 mt-1">
                        {step.cost && <span className="mr-4">{step.cost}</span>}
                        {step.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.time}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Training */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-[#0B3954]" />
              <h2 className="text-xl font-bold text-[#0B3954]">
                {language === "es" ? "Formación Recomendada" : "Recommended Training"}
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              {language === "es"
                ? "Para mejorar tus oportunidades laborales en Canadá:"
                : "To improve your job opportunities in Canada:"}
            </p>
            <div className="space-y-3">
              {trainingItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1ABC9C] rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Jobs */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-[#0B3954]" />
              <h2 className="text-xl font-bold text-[#0B3954]">
                {language === "es" ? "Alternativas Laborales" : "Job Alternatives"}
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              {language === "es"
                ? "Mientras completas tu validación, considera estas opciones:"
                : "While completing your validation, consider these options:"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternativeJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{job}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Checklist */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#0B3954] mb-6">
              {language === "es" ? "Tu Lista de Acción" : "Your Action List"}
            </h2>
            <div className="space-y-4">
              {result.checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <button onClick={() => handleChecklistToggle(index)} className="mt-1 flex-shrink-0">
                    {checkedItems[index] ? (
                      <CheckCircle2 className="w-5 h-5 text-[#1ABC9C]" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <span className={`text-gray-700 ${checkedItems[index] ? "line-through text-gray-500" : ""}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Button
            onClick={handleEditInfo}
            variant="outline"
            className="border-[#0B3954] text-[#0B3954] hover:bg-[#0B3954] hover:text-white px-6 py-3 rounded-full font-medium bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "es" ? "Editar Información" : "Edit Information"}
          </Button>

          <Button
            onClick={handleDownloadPDF}
            className="bg-[#0B3954] hover:bg-[#0A2F42] text-white px-6 py-3 rounded-full font-medium"
          >
            <Download className="mr-2 h-4 w-4" />
            {language === "es" ? "Descargar PDF" : "Download PDF"}
          </Button>

          <Button
            onClick={handleSendEmail}
            className="bg-[#1ABC9C] hover:bg-[#16A085] text-white px-6 py-3 rounded-full font-medium"
          >
            <Mail className="mr-2 h-4 w-4" />
            {language === "es" ? "Enviar por Email" : "Send by Email"}
          </Button>

          <Button
            onClick={onGenerateAnother}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium bg-transparent"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {language === "es" ? "Comenzar de Nuevo" : "Start Over"}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#0B3954] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">a</span>
            </div>
            <span className="text-[#0B3954] font-bold text-lg">aivamos</span>
          </div>
          <p className="text-gray-500 text-sm">
            {language === "es"
              ? "Construyendo caminos para el talento global."
              : "Building pathways for global talent."}
          </p>
        </div>
      </div>
    </div>
  )
}
