"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import type { UserData } from "@/app/page"
import { Loader2 } from "lucide-react"

interface ConversationalFormProps {
  onSubmit: (data: UserData, language: string) => void
  isLoading: boolean
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Cameroon",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "South Korea",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zimbabwe",
]

export default function ConversationalForm({ onSubmit, isLoading }: ConversationalFormProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    nationality: "",
    profession: "",
    yearsExperience: 0,
    province: "",
    email: "",
  })

  const provinces = [
    { value: "ontario", label: t("province.ontario") },
    { value: "quebec", label: t("province.quebec") },
    { value: "alberta", label: t("province.alberta") },
    { value: "britishColumbia", label: t("province.britishColumbia") },
    { value: "manitoba", label: t("province.manitoba") },
    { value: "saskatchewan", label: t("province.saskatchewan") },
    { value: "novascotia", label: t("province.novascotia") },
    { value: "newbrunswick", label: t("province.newbrunswick") },
    { value: "newfoundland", label: t("province.newfoundland") },
    { value: "pei", label: t("province.pei") },
    { value: "northwest", label: t("province.northwest") },
    { value: "nunavut", label: t("province.nunavut") },
    { value: "yukon", label: t("province.yukon") },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      onSubmit(formData, language)
    }
  }

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.nationality !== "" &&
      formData.profession.trim() !== "" &&
      formData.yearsExperience > 0 &&
      formData.province !== "" &&
      formData.email.trim() !== "" &&
      formData.email.includes("@")
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Conversational Form */}
          <div className="space-y-8 text-2xl md:text-4xl leading-relaxed text-[#0B3954]">
            {/* Name Line */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-light">{t("form.myNameIs")}</span>
              <div className="relative">
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t("form.namePlaceholder")}
                  className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 placeholder:text-gray-400 min-w-[200px] md:min-w-[300px]"
                  required
                />
              </div>
            </div>

            {/* From and Profession Line */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-light">{t("form.from")}</span>
              <div className="relative">
                <Select
                  value={formData.nationality}
                  onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                >
                  <SelectTrigger className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 min-w-[150px] md:min-w-[200px]">
                    <SelectValue placeholder={t("form.countryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-lg">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="font-light">{t("form.andImA")}</span>
              <div className="relative">
                <Input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder={t("form.professionPlaceholder")}
                  className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 placeholder:text-gray-400 min-w-[200px] md:min-w-[250px]"
                  required
                />
              </div>
            </div>

            {/* Experience and Province Line */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-light">{t("form.with")}</span>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.yearsExperience || ""}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: Number.parseInt(e.target.value) || 0 })}
                  placeholder={t("form.yearsPlaceholder")}
                  className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 placeholder:text-gray-400 min-w-[80px] md:min-w-[100px]"
                  required
                />
              </div>
              <span className="font-light">{t("form.yearsOfExperience")}</span>
              <div className="relative">
                <Select
                  value={formData.province}
                  onValueChange={(value) => setFormData({ ...formData, province: value })}
                >
                  <SelectTrigger className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 min-w-[150px] md:min-w-[200px]">
                    <SelectValue placeholder={t("form.provincePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.value} value={province.value} className="text-lg">
                        {province.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Email Line */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-light">{t("form.myEmailIs")}</span>
              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("form.emailPlaceholder")}
                  className="h-12 md:h-16 text-2xl md:text-4xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#1ABC9C] rounded-none px-2 placeholder:text-gray-400 min-w-[250px] md:min-w-[350px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-12">
            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="bg-[#1ABC9C] hover:bg-[#16A085] text-white text-xl px-12 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  {t("form.generating")}
                </>
              ) : (
                t("form.generate")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
