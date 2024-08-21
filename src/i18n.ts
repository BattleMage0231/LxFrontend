import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationFR from './locales/fr/translation.json'

const resources = {
    fr: {
        translation: translationFR
    }
}

i18n.use(initReactI18next)
    .init({ resources })
    .catch(console.log)

export default i18n
