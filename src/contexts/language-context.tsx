"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "es" | "fr" | "pt"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Welcome Screen
    "welcome.headline": "Turn your experience into a Canadian career.",
    "welcome.subtitle":
      "Get a clear, step-by-step plan to validate your profession and start working in your field—fast.",
    "welcome.start": "Begin now",

    // Form
    "form.myNameIs": "My name is",
    "form.from": "from",
    "form.andImA": "and I'm a",
    "form.with": "with",
    "form.yearsOfExperience": "years of experience, living in",
    "form.myEmailIs": "My email is",
    "form.namePlaceholder": "First, Last",
    "form.countryPlaceholder": "Country",
    "form.professionPlaceholder": "Profession",
    "form.yearsPlaceholder": "0",
    "form.provincePlaceholder": "Province",
    "form.emailPlaceholder": "email@example.com",
    "form.generate": "Generate my Roadmap",
    "form.generating": "Generating your roadmap...",

    // Results
    "results.professionalDifferences": "Professional Differences",
    "results.credentialValidation": "Credential Validation",
    "results.recommendedTraining": "Recommended Training",
    "results.alternativeJobs": "Alternative Jobs",
    "results.checklist": "Interactive Checklist",
    "results.downloadPdf": "Download PDF",
    "results.sendEmail": "Send by Email",
    "results.generateAnother": "Generate another roadmap",

    // Footer
    "footer.tagline": "Building pathways for global talent.",

    // Provinces
    "province.ontario": "Ontario",
    "province.quebec": "Quebec",
    "province.alberta": "Alberta",
    "province.britishColumbia": "British Columbia",
    "province.manitoba": "Manitoba",
    "province.saskatchewan": "Saskatchewan",
    "province.novascotia": "Nova Scotia",
    "province.newbrunswick": "New Brunswick",
    "province.newfoundland": "Newfoundland and Labrador",
    "province.pei": "Prince Edward Island",
    "province.northwest": "Northwest Territories",
    "province.nunavut": "Nunavut",
    "province.yukon": "Yukon",
  },
  es: {
    // Welcome Screen
    "welcome.headline": "Convierte tu experiencia en una carrera en Canadá.",
    "welcome.subtitle":
      "Obtén un plan claro y paso a paso para validar tu profesión y empezar a trabajar en tu campo—rápido.",
    "welcome.start": "Empezar ahora",

    // Form
    "form.myNameIs": "Mi nombre es",
    "form.from": "de",
    "form.andImA": "y soy",
    "form.with": "con",
    "form.yearsOfExperience": "años de experiencia, viviendo en",
    "form.myEmailIs": "Mi email es",
    "form.namePlaceholder": "Nombre, Apellido",
    "form.countryPlaceholder": "País",
    "form.professionPlaceholder": "Profesión",
    "form.yearsPlaceholder": "0",
    "form.provincePlaceholder": "Provincia",
    "form.emailPlaceholder": "email@ejemplo.com",
    "form.generate": "Generar mi Hoja de Ruta",
    "form.generating": "Generando tu hoja de ruta...",

    // Results
    "results.professionalDifferences": "Diferencias Profesionales",
    "results.credentialValidation": "Validación de Credenciales",
    "results.recommendedTraining": "Entrenamiento Recomendado",
    "results.alternativeJobs": "Trabajos Alternativos",
    "results.checklist": "Lista de Verificación Interactiva",
    "results.downloadPdf": "Descargar PDF",
    "results.sendEmail": "Enviar por Email",
    "results.generateAnother": "Generar otra hoja de ruta",

    // Footer
    "footer.tagline": "Construyendo caminos para el talento global.",

    // Provinces
    "province.ontario": "Ontario",
    "province.quebec": "Quebec",
    "province.alberta": "Alberta",
    "province.britishColumbia": "Columbia Británica",
    "province.manitoba": "Manitoba",
    "province.saskatchewan": "Saskatchewan",
    "province.novascotia": "Nueva Escocia",
    "province.newbrunswick": "Nuevo Brunswick",
    "province.newfoundland": "Terranova y Labrador",
    "province.pei": "Isla del Príncipe Eduardo",
    "province.northwest": "Territorios del Noroeste",
    "province.nunavut": "Nunavut",
    "province.yukon": "Yukón",
  },
  fr: {
    // Welcome Screen
    "welcome.headline": "Transformez votre expérience en carrière canadienne.",
    "welcome.subtitle":
      "Recevez un plan clair, étape par étape, pour faire reconnaître votre profession et travailler dans votre domaine—rapidement.",
    "welcome.start": "Commencer maintenant",

    // Form
    "form.myNameIs": "Je m'appelle",
    "form.from": "de",
    "form.andImA": "et je suis",
    "form.with": "avec",
    "form.yearsOfExperience": "années d'expérience, vivant en",
    "form.myEmailIs": "Mon email est",
    "form.namePlaceholder": "Prénom, Nom",
    "form.countryPlaceholder": "Pays",
    "form.professionPlaceholder": "Profession",
    "form.yearsPlaceholder": "0",
    "form.provincePlaceholder": "Province",
    "form.emailPlaceholder": "email@exemple.com",
    "form.generate": "Générer ma Feuille de Route",
    "form.generating": "Génération de votre feuille de route...",

    // Results
    "results.professionalDifferences": "Différences Professionnelles",
    "results.credentialValidation": "Validation des Diplômes",
    "results.recommendedTraining": "Formation Recommandée",
    "results.alternativeJobs": "Emplois Alternatifs",
    "results.checklist": "Liste de Contrôle Interactive",
    "results.downloadPdf": "Télécharger PDF",
    "results.sendEmail": "Envoyer par Email",
    "results.generateAnother": "Générer une autre feuille de route",

    // Footer
    "footer.tagline": "Construire des voies pour les talents mondiaux.",

    // Provinces
    "province.ontario": "Ontario",
    "province.quebec": "Québec",
    "province.alberta": "Alberta",
    "province.britishColumbia": "Colombie-Britannique",
    "province.manitoba": "Manitoba",
    "province.saskatchewan": "Saskatchewan",
    "province.novascotia": "Nouvelle-Écosse",
    "province.newbrunswick": "Nouveau-Brunswick",
    "province.newfoundland": "Terre-Neuve-et-Labrador",
    "province.pei": "Île-du-Prince-Édouard",
    "province.northwest": "Territoires du Nord-Ouest",
    "province.nunavut": "Nunavut",
    "province.yukon": "Yukon",
  },
  pt: {
    // Welcome Screen
    "welcome.headline": "Transforme sua experiência em uma carreira no Canadá.",
    "welcome.subtitle":
      "Receba um plano claro, passo a passo, para validar sua profissão e começar a atuar na sua área—rápido.",
    "welcome.start": "Começar agora",

    // Form
    "form.myNameIs": "Meu nome é",
    "form.from": "de",
    "form.andImA": "e sou",
    "form.with": "com",
    "form.yearsOfExperience": "anos de experiência, morando em",
    "form.myEmailIs": "Meu email é",
    "form.namePlaceholder": "Nome, Sobrenome",
    "form.countryPlaceholder": "País",
    "form.professionPlaceholder": "Profissão",
    "form.yearsPlaceholder": "0",
    "form.provincePlaceholder": "Província",
    "form.emailPlaceholder": "email@exemplo.com",
    "form.generate": "Gerar meu Roteiro",
    "form.generating": "Gerando seu roteiro...",

    // Results
    "results.professionalDifferences": "Diferenças Profissionais",
    "results.credentialValidation": "Validação de Credenciais",
    "results.recommendedTraining": "Treinamento Recomendado",
    "results.alternativeJobs": "Empregos Alternativos",
    "results.checklist": "Lista de Verificação Interativa",
    "results.downloadPdf": "Baixar PDF",
    "results.sendEmail": "Enviar por Email",
    "results.generateAnother": "Gerar outro roteiro",

    // Footer
    "footer.tagline": "Construindo caminhos para talentos globais.",

    // Provinces
    "province.ontario": "Ontário",
    "province.quebec": "Quebec",
    "province.alberta": "Alberta",
    "province.britishColumbia": "Colúmbia Britânica",
    "province.manitoba": "Manitoba",
    "province.saskatchewan": "Saskatchewan",
    "province.novascotia": "Nova Escócia",
    "province.newbrunswick": "Novo Brunswick",
    "province.newfoundland": "Terra Nova e Labrador",
    "province.pei": "Ilha do Príncipe Eduardo",
    "province.northwest": "Territórios do Noroeste",
    "province.nunavut": "Nunavut",
    "province.yukon": "Yukon",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[language][key as keyof (typeof translations)[typeof language]] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value))
      })
    }

    return text
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
