import { createContext, useContext } from "react";
import { Language } from "../utilites/languages/languages.ts";

export const LanguageContext = createContext<Language>(Language.FR);

export const useLanguage = () => useContext(LanguageContext);
