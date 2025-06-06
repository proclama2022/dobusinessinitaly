import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { supportedLanguages } from '@/lib/languages';
// Using the new 3:1 aspect ratio logo from public directory
const logoImage = '/images/logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Funzione per generare un percorso con il prefisso lingua corrente
  const getLocalizedPath = (path: string) => {
    // Se il percorso è '/', reindirizza alla home page con solo il prefisso lingua
    if (path === '/') {
      return `/${i18n.language}`;
    }
    // Altrimenti aggiungi il prefisso lingua al percorso
    return `/${i18n.language}${path}`;
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
    { path: '/media', label: t('navigation.media') },
    { path: '/contact', label: t('navigation.contact') }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={getLocalizedPath('/')} className="flex items-center">
              <img
                src={logoImage}
                alt="Yourbusinessinitaly.com"
                className="w-32 h-auto object-contain max-w-full"
                onError={(e) => {
                  // Fallback al testo se l'immagine non può essere caricata
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('text-2xl', 'font-heading', 'font-bold', 'text-primary');
                  target.parentElement!.innerHTML = '<span>Yourbusinessinitaly.com</span>';
                }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-700 hover:text-primary focus:outline-none"
            >
              <i className="fas fa-bars text-xl" style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'auto',
                filter: 'drop-shadow(0 0 0.5px rgba(0,0,0,0.1))',
                transform: 'translateZ(0)'
              }}></i>
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
                  : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 text-sm`}
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
