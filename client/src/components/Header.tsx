import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { supportedLanguages } from '@/App';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Funzione per generare un percorso con il prefisso lingua corrente
  const getLocalizedPath = (path: string) => {
    return path === '/' ? `/${i18n.language}` : `/${i18n.language}${path}`;
  };

  // Estrai il percorso e la lingua corrente dall'URL
  const extractPathInfo = () => {
    const segments = location.split('/');
    if (segments.length > 1 && supportedLanguages.includes(segments[1])) {
      // URL è del tipo /{lang}/{path}
      const pathWithoutLang = '/' + segments.slice(2).join('/');
      return {
        lang: segments[1],
        path: pathWithoutLang === '/' ? '' : pathWithoutLang
      };
    }
    // URL non ha prefisso lingua
    return {
      lang: '',
      path: location
    };
  };

  const { path } = extractPathInfo();

  // Verifica se il link è attivo
  const isActiveLink = (routePath: string) => {
    if (routePath === '/') {
      // Per la home page, controlla se siamo alla root con o senza prefisso lingua
      return path === '' || path === '/';
    }
    // Per altre pagine, confronta il percorso senza prefisso
    return path === routePath;
  };

  const navigationLinks = [
    { path: '/', label: t('navigation.home') },
    { path: '/services', label: t('navigation.services') },
    { path: '/about', label: t('navigation.about') },
    { path: '/blog', label: t('navigation.blog') },
    { path: '/contact', label: t('navigation.contact') }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={getLocalizedPath('/')} className="text-2xl font-heading font-bold text-primary">
              <span>DoBusinessNew</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-neutral-700 hover:text-primary focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link 
                key={link.path} 
                href={getLocalizedPath(link.path)}
                className={`font-medium ${isActiveLink(link.path) 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-3`}
              >
                {link.label}
              </Link>
            ))}
            
            <LanguageSelector />
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden mt-3 border-t border-neutral-200 pt-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <Link 
                key={link.path} 
                href={getLocalizedPath(link.path)}
                className={`font-medium ${isActiveLink(link.path) 
                  ? 'text-primary' 
                  : 'text-neutral-700 hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2">
              <LanguageSelector isMobile={true} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
