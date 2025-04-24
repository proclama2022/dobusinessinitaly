import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalizedRoute } from "@/components/LocalizedRoute";
import { useLanguagePrefix, supportedLanguages } from "@/hooks/use-language-prefix";
import { useEffect } from "react";

// Componente per gestire il reindirizzamento alla home localizzata
function RedirectToLocalizedHome() {
  const [location, setLocation] = useLocation();
  const { currentLanguage } = useLanguagePrefix();
  
  useEffect(() => {
    setLocation(`/${currentLanguage}`);
  }, [currentLanguage, setLocation]);
  
  return null;
}

function AppRouter() {
  // Utilizziamo l'hook personalizzato per gestire i prefissi linguistici
  useLanguagePrefix();
  
  return (
    <>
      <Header />
      <main>
        <Switch>
          {/* Rotte principali con supporto per prefissi linguistici */}
          <Route path="/" component={RedirectToLocalizedHome} />
          <LocalizedRoute path="/" component={Home} />
          <LocalizedRoute path="/services" component={Services} />
          <LocalizedRoute path="/about" component={About} />
          <LocalizedRoute path="/blog" component={Blog} />
          
          {/* Rotta per i singoli post del blog con supporto linguistico */}
          {supportedLanguages.map(lang => (
            <Route key={`blog-${lang}`} path={`/${lang}/blog/:slug`} component={BlogPost} />
          ))}
          <Route path="/blog/:slug" component={BlogPost} />
          
          <LocalizedRoute path="/contact" component={Contact} />
          
          {/* Pagina 404 con supporto per prefissi linguistici */}
          {supportedLanguages.map(lang => (
            <Route key={`notfound-${lang}`} path={`/${lang}/:rest*`}>
              {(params) => {
                // Verifica se l'URL contiene una rotta valida senza il prefisso della lingua
                if (!['/services', '/about', '/blog', '/contact'].includes(`/${params.rest}`)) {
                  return <NotFound />;
                }
                return null;
              }}
            </Route>
          ))}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
