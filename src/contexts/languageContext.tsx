import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from "react"
import { Language } from "../utilites/entries/BaseEntry"
import { useTranslation } from "react-i18next"

type LanguageContextType = {
    language: Language,
    setLanguage: (newLanguage: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState<Language>(Language.FR)
    useEffect(() => {
        i18n.changeLanguage(language.toLocaleLowerCase())
    }, [language, i18n])
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if(!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context;
}
