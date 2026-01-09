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
import Social from '@/pages/Social';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import OpenCompanyItaly from '@/pages/OpenCompanyItaly';
import OpenVATNumberItaly from '@/pages/OpenVATNumberItaly';
import TaxAccountingExpats from '@/pages/TaxAccountingExpats';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildLocalizedPath, DEFAULT_LANGUAGE, stripLanguagePrefix } from '@/lib/languagePaths';

// Lingue supportate
export const supportedLanguages = ['it', 'en', 'fr', 'de', 'es'];

/**
 * Estrattore di prefisso lingua dall'URL
 */
const extractLanguageFromPath = (path: string) => {
  const { lang, cleanPath } = stripLanguagePrefix(path);
  return { lang, path: cleanPath };
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
    return buildLocalizedPath(cleanPath, i18n.language);
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
    const init = async () => {
      if (lang && supportedLanguages.includes(lang)) {
        await i18n.changeLanguage(lang);
      } else if (location === '/' || !lang) {
        const target = buildLocalizedPath('/', i18n.language);
        if (target !== '/' || i18n.language !== DEFAULT_LANGUAGE) {
          setLocation(target);
        }
      }
      setInitialized(true);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  
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
            // BlogPost gets lang and slug from URL params
            return supportedLanguages.includes(params.lang) 
              ? <BlogPost /> 
              : <NotFound />;
          }} />
          
          <Route path="/:lang/contact" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Contact /> : <NotFound />;
          }} />
          
          {/* Social & Video */}
          <Route path="/:lang/social" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <Social /> : <NotFound />;
          }} />
          
          {/* Privacy Policy page */}
          <Route path="/:lang/privacy-policy" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <PrivacyPolicy /> : <NotFound />;
          }} />
          
          {/* Landing pages */}
          <Route path="/:lang/services/open-company-italy" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <OpenCompanyItaly /> : <NotFound />;
          }} />
          
          <Route path="/:lang/services/open-vat-number-italy" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <OpenVATNumberItaly /> : <NotFound />;
          }} />
          
          <Route path="/:lang/services/tax-accounting-expats" component={({ params }) => {
            return supportedLanguages.includes(params.lang) ? <TaxAccountingExpats /> : <NotFound />;
          }} />
          
          {/* Fallback alla root per reindirizzare */}
          <Route path="/" component={() => {
            const target = buildLocalizedPath('/', i18n.language);
            if (target !== '/') {
              setLocation(target);
            }
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
