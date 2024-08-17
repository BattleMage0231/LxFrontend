import { createContext, useContext } from "react";
import { Language } from "../utilites/BaseEntry.ts";

export const LanguageContext = createContext<Language>(Language.FR);

export const useLanguage = () => useContext(LanguageContext);
