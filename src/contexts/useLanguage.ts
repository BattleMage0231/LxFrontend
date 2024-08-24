import { createContext, useContext } from "react"
import { Language } from "../utilites/entries/BaseEntry"

type LanguageContextType = {
    language: Language,
    setLanguage: (newLanguage: Language) => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if(!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
