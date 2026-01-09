import { useLocation, useRoute } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { supportedLanguages } from '@/lib/languages';
import { buildLocalizedPath, DEFAULT_LANGUAGE, stripLanguagePrefix } from '@/lib/languagePaths';
export { supportedLanguages };

/**
 * Estrae il prefisso della lingua dall'URL corrente
 */
export function extractLanguageFromPath(path: string): {
  lang: string | null;
  newPath: string;
} {
  const { lang, cleanPath } = stripLanguagePrefix(path);
  return { lang, newPath: cleanPath };
}

/**
 * Hook personalizzato per gestire i prefissi linguistici nelle URL
 */
export function useLanguagePrefix() {
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  
  // Estrai la lingua dall'URL corrente
  const { lang, newPath } = extractLanguageFromPath(location);
  
  // Se l'URL contiene un prefisso linguistico valido e diverso dalla lingua attuale
  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  
  // Se l'URL non contiene un prefisso linguistico e la lingua non e' quella di default, aggiungilo
  useEffect(() => {
    if (!lang && i18n.language !== DEFAULT_LANGUAGE) {
      const target = buildLocalizedPath(location, i18n.language);
      if (target !== location) {
        setLocation(target);
      }
    }
  }, [location, lang, i18n.language, setLocation]);
  
  // Funzione per costruire un URL con il prefisso linguistico corretto
  const getLocalizedPath = (path: string): string => {
    // Estrai eventuali prefissi linguistici esistenti
    const { newPath: cleanPath } = extractLanguageFromPath(path);
    
    // Aggiungi il prefisso della lingua corrente
    return buildLocalizedPath(cleanPath, i18n.language);
  };
  
  // Funzione per cambiare lingua e aggiornare l'URL
  const changeLanguage = (newLang: string) => {
    const { newPath: cleanPath } = extractLanguageFromPath(location);
    i18n.changeLanguage(newLang);
    setLocation(buildLocalizedPath(cleanPath, newLang));
  };
  
  return {
    currentLanguage: i18n.language,
    changeLanguage,
    getLocalizedPath,
    pathWithoutLanguage: newPath
  };
}
