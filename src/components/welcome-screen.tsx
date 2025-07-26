"use client"

import { Button } from "@/components/ui/button"
import { useLanguage, type Language } from "@/contexts/language-context"
import { Globe } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { language, setLanguage, t } = useLanguage()

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "fr", label: "FR" },
    { code: "pt", label: "PT" },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
          <Globe className="w-4 h-4 text-gray-600 ml-2" />
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                language === lang.code ? "bg-white text-[#0B3954] shadow-sm" : "text-gray-600 hover:text-[#0B3954]"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0B3954] leading-tight">{t("welcome.headline")}</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("welcome.subtitle")}
            </p>
          </div>

          <div className="pt-8">
            <Button
              onClick={onStart}
              className="bg-[#1ABC9C] hover:bg-[#16A085] text-white text-lg px-12 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              {t("welcome.start")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
