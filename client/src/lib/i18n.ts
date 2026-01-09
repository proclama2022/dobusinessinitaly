import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en.json';
import itTranslation from '../locales/it.json';
import frTranslation from '../locales/fr.json';
import deTranslation from '../locales/de.json';
import esTranslation from '../locales/es.json';

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  it: {
    translation: itTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  es: {
    translation: esTranslation
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'it',
    lng: 'en', // Set default language to English
    debug: false,
    // Do not return empty strings or nulls from translations so defaultValue fallback works
    returnEmptyString: false,
    returnNull: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    }
  });

export default i18n;
