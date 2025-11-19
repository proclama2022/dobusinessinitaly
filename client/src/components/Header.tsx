import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import OptimizedImage from './OptimizedImage';
import { supportedLanguages } from '@/lib/languages';
// Using responsive logos: mobile (square) and desktop (3:1 ratio) with aggressive cache busting
const timestamp = Date.now();
const logoDesktop = `/images/logonew.png?v=${timestamp}&t=${timestamp}`;
const logoMobile = `/images/logonew.png?v=${timestamp}&t=${timestamp}`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location] = useLocation();
  const [, navigate] = useLocation();
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
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                const homePath = getLocalizedPath('/');
                console.log('Logo clicked! Navigating to:', homePath);
                navigate(homePath);
              }}
            >
              {/* Logo Mobile - visible on small screens */}
              <OptimizedImage
                src={logoMobile}
                alt="YBI - Yourbusinessinitaly.com"
                className="block sm:hidden w-14 h-14 object-contain cursor-pointer"
                width={56}
                height={56}
                priority={true}
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.2) brightness(1.1)'
                }}
              />
              {/* Logo Desktop - visible on larger screens */}
              <OptimizedImage
                src={logoDesktop}
                alt="Yourbusinessinitaly.com - Commercialista per stranieri in Italia"
                className="hidden sm:block w-28 md:w-40 lg:w-52 max-h-20 h-auto object-contain cursor-pointer"
                width={208}
                height={75}
                priority={true}
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.2) brightness(1.1)'
                }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-700 hover:text-primary focus:outline-none touch-manipulation p-4 -m-2 min-h-[48px] min-w-[48px] active:scale-95 transition-transform duration-150 focus:ring-2 focus:ring-primary/30 rounded-lg"
              aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'auto',
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                touchAction: 'manipulation',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navigationLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`font-medium ${isActiveLink(link.path)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-3 py-3 text-sm lg:text-base flex items-center min-h-[48px] transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-primary/30 rounded-lg outline-none`}
                    >
                      {link.label}
                      <svg className={`w-3 h-3 ml-1 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-neutral-200 py-2 z-50">
                        {link.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            href={getLocalizedPath(dropdownItem.path)}
                            className="block px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors duration-200 touch-manipulation min-h-[44px] flex items-center"
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
                      : 'text-neutral-700 hover:text-primary hover:border-b-2 hover:border-primary'} px-3 py-3 text-sm lg:text-base min-h-[48px] flex items-center transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-primary/30 rounded-lg outline-none`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="ml-2 lg:ml-4">
              <LanguageSelector />
            </div>
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
          className={`md:hidden fixed left-0 right-0 top-[72px] bg-white border-t border-neutral-200 shadow-lg ${mobileMenuOpen ? 'block' : 'hidden'} z-50 max-h-[calc(100vh-72px)] overflow-y-auto touch-pan-y`}
          role="navigation"
          aria-label="Menu principale mobile"
          ref={mobileMenuRef}
          tabIndex={-1}
        >
          <nav className="flex flex-col space-y-2 p-4">
            {navigationLinks.map((link) => (
              <div key={link.path}>
                {link.dropdown ? (
                  <div className="space-y-2">
                    <Link
                      href={getLocalizedPath(link.path)}
                      className={`font-medium ${isActiveLink(link.path)
                        ? 'text-primary bg-primary/5'
                        : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'} block py-3 px-4 rounded-lg touch-manipulation active:bg-neutral-100 transition-colors duration-200 min-h-[48px] flex items-center justify-between outline-none focus:ring-2 focus:ring-primary/30`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <div className="ml-4 space-y-2 pl-2 border-l-2 border-neutral-200">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          href={getLocalizedPath(dropdownItem.path)}
                          className="block text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 py-3 px-4 rounded-lg touch-manipulation active:bg-neutral-100 transition-colors duration-200 min-h-[44px] flex items-center outline-none focus:ring-2 focus:ring-primary/30"
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
                      ? 'text-primary bg-primary/5'
                      : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'} block py-3 px-4 rounded-lg touch-manipulation active:bg-neutral-100 transition-colors duration-200 min-h-[48px] flex items-center outline-none focus:ring-2 focus:ring-primary/30`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 pb-4">
              <LanguageSelector isMobile={true} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
