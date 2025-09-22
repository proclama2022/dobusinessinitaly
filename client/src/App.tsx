import React, { Suspense, lazy } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// FontAwesome rimosso per migliorare performance mobile
// Critical pages (loaded immediately)
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Lazy loaded pages con preload hints ottimizzati per mobile
const Services = lazy(() =>
  import(/* webpackChunkName: "services", webpackPrefetch: true */ "@/pages/Services")
);
const About = lazy(() =>
  import(/* webpackChunkName: "about", webpackPrefetch: true */ "@/pages/About")
);
const Blog = lazy(() =>
  import(/* webpackChunkName: "blog", webpackPrefetch: true */ "@/pages/Blog")
);
const BlogPost = lazy(() =>
  import(/* webpackChunkName: "blog-post" */ "@/pages/BlogPost")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact", webpackPrefetch: true */ "@/pages/Contact")
);
const Media = lazy(() =>
  import(/* webpackChunkName: "media" */ "@/pages/Media")
);
const Social = lazy(() =>
  import(/* webpackChunkName: "social" */ "@/pages/Social")
);
const Admin = lazy(() =>
  import(/* webpackChunkName: "admin" */ "@/pages/Admin")
);
const OpenCompanyItaly = lazy(() =>
  import(/* webpackChunkName: "open-company", webpackPrefetch: true */ "@/pages/OpenCompanyItaly")
);
const OpenVATNumberItaly = lazy(() =>
  import(/* webpackChunkName: "open-vat", webpackPrefetch: true */ "@/pages/OpenVATNumberItaly")
);
const TaxAccountingExpats = lazy(() =>
  import(/* webpackChunkName: "tax-accounting", webpackPrefetch: true */ "@/pages/TaxAccountingExpats")
);
const PillarBusinessItaly = lazy(() =>
  import(/* webpackChunkName: "pillar-business", webpackPrefetch: true */ "@/pages/PillarBusinessItaly")
);
const PrivacyPolicy = lazy(() =>
  import(/* webpackChunkName: "privacy" */ '@/pages/PrivacyPolicy')
);
const CookiePolicy = lazy(() =>
  import(/* webpackChunkName: "cookie-policy" */ '@/pages/CookiePolicy')
);

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supportedLanguages } from "./lib/languages";
const CookieBanner = lazy(() => import('@/components/CookieBanner'));
const Helmet = lazy(() => import('react-helmet-async').then(mod => ({ default: mod.Helmet })));

// Componente di loading ottimizzato per performance
const PageLoader = () => (
  <div className="loading-spinner">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <span className="ml-2 text-sm text-gray-600">Caricamento...</span>
  </div>
);

function Router() {
  const { i18n } = useTranslation();
  const [consentData, setConsentData] = useState({
    hasAnalyticsConsent: false,
    hasMarketingConsent: false,
    isLoaded: false,
    consent: null
  });

  useEffect(() => {
    // Carica dinamicamente gli hook del cookie solo quando necessario
    const loadCookieHook = async () => {
      const hook = await import('@/hooks/useCookieConsent');
      const { default: useCookieConsentHook } = hook;
      const { hasAnalyticsConsent, hasMarketingConsent, isLoaded, consent } = useCookieConsentHook();
      setConsentData({ hasAnalyticsConsent, hasMarketingConsent, isLoaded, consent });
    };

    loadCookieHook();
  }, []);

  const { hasAnalyticsConsent, hasMarketingConsent, isLoaded, consent } = consentData;
  const allowAnalytics = isLoaded && !!consent && hasAnalyticsConsent;
  const allowMarketing = isLoaded && !!consent && hasMarketingConsent;

  // Imposta la lingua dal pathname all'avvio dell'app
  useEffect(() => {
    const pathname = window.location.pathname;
    const langPrefix = pathname.split('/')[1];

    if (supportedLanguages.includes(langPrefix)) {
      i18n.changeLanguage(langPrefix);
    }
  }, [i18n]);

  return (
    <>
      {/* Conditional analytics loading based on cookie consent */}
      <Helmet>
        {(allowAnalytics || allowMarketing) && (
          <>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                // Consent Mode v2: imposta stato iniziale in base al consenso
                gtag('consent', 'default', {
                  ad_user_data: '${allowMarketing ? 'granted' : 'denied'}',
                  ad_personalization: '${allowMarketing ? 'granted' : 'denied'}',
                  ad_storage: '${allowMarketing ? 'granted' : 'denied'}',
                  analytics_storage: '${allowAnalytics ? 'granted' : 'denied'}',
                  functionality_storage: 'granted',
                  security_storage: 'granted',
                  personalization_storage: 'denied'
                });
              `}
            </script>
            {/* Carica gtag.js UNA sola volta con l'ID consentito: GA4 se analytics è consentito, altrimenti Ads se è consentito solo marketing */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${allowAnalytics ? 'G-X82GKPCGB7' : 'AW-10798871348'}`}
            ></script>
            {/* Configura SOLO gli ID per cui c'è consenso */}
            {allowAnalytics && (
              <script>
                {`gtag('config','G-X82GKPCGB7', { anonymize_ip: true });`}
              </script>
            )}
            {allowMarketing && (
              <script>
                {`gtag('config','AW-10798871348');`}
              </script>
            )}
            {/* Aggiorna il consenso ad ogni render (utile se l'utente cambia le preferenze) */}
            <script>
              {`
                gtag('consent', 'update', {
                  ad_user_data: '${allowMarketing ? 'granted' : 'denied'}',
                  ad_personalization: '${allowMarketing ? 'granted' : 'denied'}',
                  ad_storage: '${allowMarketing ? 'granted' : 'denied'}',
                  analytics_storage: '${allowAnalytics ? 'granted' : 'denied'}'
                });
              `}
            </script>
          </>
        )}
      </Helmet>

      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Switch>
          {/* Home per ogni lingua */}
          {supportedLanguages.map(lang => (
            <Route key={`home-${lang}`} path={`/${lang}`} component={Home} />
          ))}
          <Route path="/" component={Home} />

          {/* Percorsi localizzati per le pagine */}
          {supportedLanguages.map(lang => (
            <Route key={`services-${lang}`} path={`/${lang}/services`} component={Services} />
          ))}
          <Route path="/services" component={Services} />

          {/* Open Company in Italy landing page */}
          {supportedLanguages.map(lang => (
            <Route key={`open-company-${lang}`} path={`/${lang}/services/open-company-italy`} component={OpenCompanyItaly} />
          ))}
          <Route path="/services/open-company-italy" component={OpenCompanyItaly} />

          {/* Open VAT Number in Italy landing page */}
          {supportedLanguages.map(lang => (
            <Route key={`open-vat-${lang}`} path={`/${lang}/services/open-vat-number-italy`} component={OpenVATNumberItaly} />
          ))}
          <Route path="/services/open-vat-number-italy" component={OpenVATNumberItaly} />

          {/* Tax Accounting for Expats landing page */}
          {supportedLanguages.map(lang => (
            <Route key={`tax-accounting-${lang}`} path={`/${lang}/services/tax-accounting-expats`} component={TaxAccountingExpats} />
          ))}
          <Route path="/services/tax-accounting-expats" component={TaxAccountingExpats} />

          {/* Pillar Page - How to Start a Business in Italy */}
          {supportedLanguages.map(lang => (
            <Route key={`pillar-${lang}`} path={`/${lang}/pillar/how-to-start-business-in-italy-2025`} component={PillarBusinessItaly} />
          ))}
          <Route path="/pillar/how-to-start-business-in-italy-2025" component={PillarBusinessItaly} />

          {supportedLanguages.map(lang => (
            <Route key={`about-${lang}`} path={`/${lang}/about`} component={About} />
          ))}
          <Route path="/about" component={About} />

          {supportedLanguages.map(lang => (
            <Route key={`blog-${lang}`} path={`/${lang}/blog`} component={Blog} />
          ))}
          <Route path="/blog" component={Blog} />

          {supportedLanguages.map(lang => (
            <Route key={`blog-post-${lang}`} path={`/${lang}/blog/:slug`} component={BlogPost} />
          ))}
          <Route path="/blog/:slug" component={BlogPost} />

          {supportedLanguages.map(lang => (
            <Route key={`contact-${lang}`} path={`/${lang}/contact`} component={Contact} />
          ))}
          <Route path="/contact" component={Contact} />

          {/* Pagina Parlano di Noi (Media) */}
          {supportedLanguages.map(lang => (
            <Route key={`media-${lang}`} path={`/${lang}/media`} component={Media} />
          ))}
          <Route path="/media" component={Media} />

          {/* Pagina Social & Video */}
          {supportedLanguages.map(lang => (
            <Route key={`social-${lang}`} path={`/${lang}/social`} component={Social} />
          ))}
          <Route path="/social" component={Social} />

          {/* Pagina di amministrazione per il blog */}
          <Route path="/admin" component={Admin} />

          {/* Privacy Policy */}
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/:lang/privacy-policy" component={PrivacyPolicy} />

          {/* Cookie Policy */}
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/:lang/cookie-policy" component={CookiePolicy} />

          {/* Pagina non trovata */}
          <Route component={NotFound} />
        </Switch>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <CookieBanner />
      </Suspense>
    </>
  );
}

// FontAwesome rimosso per migliorare performance mobile

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
