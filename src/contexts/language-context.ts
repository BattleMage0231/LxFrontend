import { createContext, useContext } from "react";
import { Language } from "../utilites/base-entry.ts";

export const LanguageContext = createContext<Language>(Language.FR);

export const useLanguage = () => useContext(LanguageContext);
