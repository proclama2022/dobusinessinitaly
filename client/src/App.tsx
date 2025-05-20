import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from '@fortawesome/fontawesome-svg-core';
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Media from "@/pages/Media";
import Admin from "@/pages/Admin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { supportedLanguages } from "./lib/languages";

function Router() {
  const { i18n } = useTranslation();

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
      <Header />
      <main>
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

          {/* Pagina di amministrazione per il blog */}
          <Route path="/admin" component={Admin} />

          {/* Pagina non trovata */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
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
