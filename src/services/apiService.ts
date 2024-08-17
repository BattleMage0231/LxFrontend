import { useLanguage } from "../contexts/languageContext"
import { Language } from "../utilites/BaseEntry"
import FREntryService from "./entries/FREntryService"

const config = {
    apiURL: "http://localhost:5163/api"
}

const entryServices = {
    [Language.FR]: new FREntryService(`${config.apiURL}/entry/fr`)
}

export const useEntryService = () => {
    const language = useLanguage()
    return entryServices[language]
}
