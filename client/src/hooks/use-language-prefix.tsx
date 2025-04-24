import { useLocation, useRoute } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { supportedLanguages } from '@/lib/languages';

/**
 * Estrae il prefisso della lingua dall'URL corrente
 */
export function extractLanguageFromPath(path: string): {
  lang: string | null;
  newPath: string;
} {
  // Esempio: /en/home -> ['', 'en', 'home']
  const segments = path.split('/');
  
  // Se il primo segmento dopo la radice è un codice lingua valido
  if (segments.length > 1 && supportedLanguages.includes(segments[1])) {
    return {
      lang: segments[1],
      // Rimuove il prefisso della lingua dal percorso
      newPath: '/' + segments.slice(2).join('/')
    };
  }
  
  return {
    lang: null,
    newPath: path
  };
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
  
  // Se l'URL non contiene un prefisso linguistico o se siamo alla root, aggiungilo
  useEffect(() => {
    if (!lang) {
      const newPath = location === '/' ? `/${i18n.language}` : `/${i18n.language}${location}`;
      setLocation(newPath);
    }
  }, [location, lang, i18n.language, setLocation]);
  
  // Funzione per costruire un URL con il prefisso linguistico corretto
  const getLocalizedPath = (path: string): string => {
    // Estrai eventuali prefissi linguistici esistenti
    const { newPath: cleanPath } = extractLanguageFromPath(path);
    
    // Aggiungi il prefisso della lingua corrente
    if (cleanPath === '/') {
      return `/${i18n.language}`;
    }
    
    return `/${i18n.language}${cleanPath}`;
  };
  
  // Funzione per cambiare lingua e aggiornare l'URL
  const changeLanguage = (newLang: string) => {
    const { newPath: cleanPath } = extractLanguageFromPath(location);
    i18n.changeLanguage(newLang);
    setLocation(`/${newLang}${cleanPath === '/' ? '' : cleanPath}`);
  };
  
  return {
    currentLanguage: i18n.language,
    changeLanguage,
    getLocalizedPath,
    pathWithoutLanguage: newPath
  };
}