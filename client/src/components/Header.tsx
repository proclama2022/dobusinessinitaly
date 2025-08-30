import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useRouter } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { supportedLanguages } from '@/lib/languages';
// Using the new 3:1 aspect ratio logo from public directory
const logoImage = '/images/logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location, navigate] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Chiudi menu con tasto ESC
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap dentro il menu mobile quando aperto
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const container = mobileMenuRef.current;
    if (!container) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));

    // Focus al primo elemento utile
    const focusables = getFocusable();
    const first = focusables[0];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        // Shift+Tab su primo: vai all'ultimo
        if (active === firstEl || !container.contains(active)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab su ultimo: torna al primo
        if (active === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
    {
      path: '/services',
      label: t('navigation.services'),
      dropdown: [
        { path: '/services/open-company-italy', label: 'Open a Company in Italy' },
        { path: '/services/open-vat-number-italy', label: 'Open a VAT Number in Italy' },
        { path: '/services/tax-accounting-expats', label: 'Tax Accounting for Expats' }
      ]
    },
    { path: '/about', label: t('navigation.about') },
    { path: '/blog', label: t('navigation.blog') },
    { path: '/media', label: t('navigation.media') },
    { path: '/social', label: t('navigation.social') },
    { path: '/contact', label: t('navigation.contact') }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              href={getLocalizedPath('/')} 
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Torna alla homepage"
              onClick={(e) => {
                e.preventDefault();
                const homePath = getLocalizedPath('/');
                console.log('Logo clicked! Navigating to:', homePath);
                navigate(homePath);
              }}
            >
              <img
                src={logoImage}
                alt="Yourbusinessinitaly.com"
                className="w-20 sm:w-24 max-h-14 h-auto object-contain max-w-full cursor-pointer"
                onError={(e) => {
                  // Fallback al testo se l'immagine non può essere caricata
                  const target = e.target as HTMLImageElement;
                  // Nascondi l'immagine difettosa
                  target.style.display = 'none';
                  // Crea un elemento span come fallback testuale (evita innerHTML diretto)
                  const span = document.createElement('span');
                  span.textContent = 'Yourbusinessinitaly.com';
                  span.className = 'text-xl sm:text-2xl font-heading font-bold text-primary';
                  target.parentElement?.appendChild(span);
                }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-700 hover:text-primary focus:outline-none"
              aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
          <nav className="hidden md:flex items-center space-x-4">
            {navigationLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`font-medium ${isActiveLink(link.path)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 text-sm flex items-center`}
                    >
                      {link.label}
                      <i className={`fas fa-chevron-down ml-1 text-xs transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-md border border-neutral-200 py-2 z-50">
                        {link.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            href={getLocalizedPath(dropdownItem.path)}
                            className="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={getLocalizedPath(link.path)}
                    className={`font-medium ${isActiveLink(link.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 text-sm`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <LanguageSelector />
          </nav>
        </div>

        {/* Backdrop mobile */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden mt-3 border-t border-neutral-200 pt-3 ${mobileMenuOpen ? 'block' : 'hidden'} relative z-50`}
          role="navigation"
          aria-label="Menu principale mobile"
          ref={mobileMenuRef}
          tabIndex={-1}
        >
          <nav className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <div key={link.path}>
                {link.dropdown ? (
                  <div className="space-y-2">
                    <Link
                      href={getLocalizedPath(link.path)}
                      className={`font-medium ${isActiveLink(link.path)
                        ? 'text-primary'
                        : 'text-neutral-700 hover:text-primary'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <div className="ml-4 space-y-2">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          href={getLocalizedPath(dropdownItem.path)}
                          className="block text-sm text-neutral-600 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
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
