import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from '@fortawesome/fontawesome-svg-core';
import { lazy, Suspense } from "react";

// Caricamento lazy delle pagine per code splitting
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const Media = lazy(() => import("@/pages/Media"));
const Social = lazy(() => import("@/pages/Social"));
const Admin = lazy(() => import("@/pages/Admin"));
const OpenCompanyItaly = lazy(() => import("@/pages/OpenCompanyItaly"));
const OpenVATNumberItaly = lazy(() => import("@/pages/OpenVATNumberItaly"));
const TaxAccountingExpats = lazy(() => import("@/pages/TaxAccountingExpats"));
const PillarBusinessItaly = lazy(() => import("@/pages/PillarBusinessItaly"));

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { supportedLanguages } from "./lib/languages";
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CookiePolicy from '@/pages/CookiePolicy';
import CookieBanner from '@/components/CookieBanner';
import { Helmet } from 'react-helmet-async';
import useCookieConsent from '@/hooks/useCookieConsent';

function Router() {
  const { i18n } = useTranslation();
  const { hasAnalyticsConsent, hasMarketingConsent, isLoaded, consent } = useCookieConsent();
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
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`}
            </script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-X82GKPCGB7"></script>
            {allowAnalytics && (
              <script>
                {`gtag('config','G-X82GKPCGB7');`}
              </script>
            )}
            {allowMarketing && (
              <script>
                {`gtag('config','AW-10798871348');`}
              </script>
            )}
          </>
        )}
      </Helmet>

      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
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
      <Footer />
      <CookieBanner />
    </>
  );
}

// Configurazione ottimizzata per FontAwesome
// Nota: La configurazione principale è ora in fontawesome.ts
// Questa configurazione è mantenuta qui per compatibilità
config.autoAddCss = true; // Assicurarsi che il CSS sia aggiunto automaticamente

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
