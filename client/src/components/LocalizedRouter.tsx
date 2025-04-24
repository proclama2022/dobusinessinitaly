import { useState, useEffect } from 'react';
import { useLocation, Link, Router, Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lingue supportate
export const supportedLanguages = ['it', 'en', 'fr', 'de', 'es'];

/**
 * Estrattore di prefisso lingua dall'URL
 */
const extractLanguageFromPath = (path: string) => {
  const segments = path.split('/');
  
  // Se il primo segmento è un codice lingua valido
  if (segments.length > 1 && supportedLanguages.includes(segments[1])) {
    return {
      lang: segments[1],
      // Rimuove il prefisso della lingua dal percorso
      path: '/' + segments.slice(2).join('/')
    };
  }
  
  // Nessun prefisso linguistico trovato
  return {
    lang: null,
    path
  };
};

/**
 * Hook personalizzato per ottenere il percorso localizzato
 */
export const useLocalizedPath = () => {
  const { i18n } = useTranslation();
  const [location] = useLocation();

  // Estrai la lingua dall'URL corrente
  const { lang, path } = extractLanguageFromPath(location);
  
  // Funzione per ottenere un percorso con prefisso linguistico
  const getLocalizedPath = (targetPath: string) => {
    // Rimuovi eventuali prefissi linguistici esistenti
    const { path: cleanPath } = extractLanguageFromPath(targetPath);
    
    // Aggiungi il prefisso della lingua corrente
    return `/${i18n.language}${cleanPath === '/' ? '' : cleanPath}`;
  };
  
  return {
    path,
    language: lang || i18n.language,
    getLocalizedPath
  };
};

/**
 * Componente per il router localizzato
 */
export const LocalizedRouter = () => {
  const [location, setLocation] = useLocation();
  const { i18n } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  
  // Estrai la lingua dall'URL corrente
  const { lang, path } = extractLanguageFromPath(location);
  
  // Se l'URL contiene un prefisso linguistico, imposta quella lingua
  useEffect(() => {
    if (lang && supportedLanguages.includes(lang)) {
      i18n.changeLanguage(lang);
    } else if (location === '/' || !lang) {
      // Reindirizza alla home con la lingua corrente se non c'è un prefisso
      setLocation(`/${i18n.language}`);
    }
    
    setInitialized(true);
  }, [lang, i18n, location, setLocation]);
  
  // Non renderizzare nulla fino a quando la lingua non è inizializzata
  if (!initialized && (location === '/' || !lang)) {
    return null;
  }
  
  return (
    <>
      <Header />
      <main>
        <Switch>
          {/* Home page */}
          <Route path="/:lang" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Home /> : <NotFound />;
          }} />
          
          {/* Pagine principali */}
          <Route path="/:lang/services" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Services /> : <NotFound />;
          }} />
          
          <Route path="/:lang/about" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <About /> : <NotFound />;
          }} />
          
          <Route path="/:lang/blog" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Blog /> : <NotFound />;
          }} />
          
          <Route path="/:lang/blog/:slug" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <BlogPost /> : <NotFound />;
          }} />
          
          <Route path="/:lang/contact" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Contact /> : <NotFound />;
          }} />
          
          {/* Fallback alla root per reindirizzare */}
          <Route path="/" component={() => {
            setLocation(`/${i18n.language}`);
            return null;
          }} />
          
          {/* Pagina non trovata */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};