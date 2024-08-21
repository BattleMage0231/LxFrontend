import { FunctionComponent, ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Language } from "../utilites/entries/BaseEntry"
import { LanguageContext } from "./useLanguage"

export const LanguageProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState<Language>(Language.FR)
    useEffect(() => {
        i18n.changeLanguage(language.toLocaleLowerCase()).catch(console.log)
    }, [language, i18n])
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}
