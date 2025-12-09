import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import OptimizedImage from './OptimizedImage';
import { supportedLanguages } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const getLocalizedPath = (path: string) => {
    const currentLang = i18n.language;
    if (path === '/') return `/${currentLang}/`;
    return `/${currentLang}${path}`;
  };

  const menuItems = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.about'), path: '/about' },
    { 
      label: t('navigation.services'), 
      path: '/services',
      hasDropdown: true 
    },
    { label: t('navigation.blog'), path: '/blog' },
    { label: t('navigation.contact'), path: '/contact' },
  ];

  const services = [
    { title: t('services.items.formation.title'), path: '/services/open-company-italy' },
    { title: t('services.items.accounting.title'), path: '/services/tax-accounting-expats' },
    { title: t('services.items.partita_iva.title'), path: '/services/open-vat-number-italy' },
    { title: t('services.items.regime_forfettario.title'), path: '/services' }, // TODO: Add specific page
    { title: t('services.items.relocation.title'), path: '/services' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href={getLocalizedPath('/')} className="flex-shrink-0 z-50 relative group" onClick={closeMenu}>
             <div className="relative">
                <OptimizedImage
                  src={logoDesktop}
                  alt="Your Business in Italy"
                  className="h-auto max-h-14 md:max-h-16 object-contain transition-all duration-300 w-36 md:w-48"
                  priority={true}
                  width={176}
                  height={59}
                />
             </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link href={item.hasDropdown ? getLocalizedPath('/services') : getLocalizedPath(item.path)}>
                  <span 
                    className={cn(
                      "text-xs xl:text-sm font-[Montserrat] font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200 py-2 inline-flex items-center gap-1 group",
                      location === getLocalizedPath(item.path) 
                        ? "text-italian-green" 
                        : "text-navy hover:text-italian-green"
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <FontAwesomeIcon icon={faChevronDown as IconProp} className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity ml-1" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-italian-green transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white rounded-sm shadow-xl border border-neutral-100 p-2 min-w-[260px]">
                      {services.map((service, idx) => (
                        <Link key={idx} href={getLocalizedPath(service.path)}>
                          <div className="block px-4 py-3 text-sm text-neutral-700 hover:bg-[#f8f9fa] hover:text-italian-green transition-colors rounded-sm cursor-pointer group/item">
                             <div className="flex items-center justify-between">
                               <span>{service.title}</span>
                               <FontAwesomeIcon icon={faChevronRight as IconProp} className="text-[10px] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                             </div>
                          </div>
                        </Link>
                      ))}
                      <div className="border-t border-neutral-100 mt-2 pt-2">
                         <Link href={getLocalizedPath('/services')}>
                            <div className="block px-4 py-2 text-xs font-bold text-center text-italian-green uppercase tracking-wider hover:underline cursor-pointer">
                              {t('services.cta.viewAll')}
                            </div>
                         </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            
            <Link href={getLocalizedPath('/contact')}>
              <button className="text-xs font-[Montserrat] font-bold uppercase tracking-wider bg-italian-green text-white py-2 px-6 rounded-sm hover:bg-italian-green-dark transition-colors shadow-sm whitespace-nowrap">
                {t('common.contactUs')}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4 z-50">
             <LanguageSelector />
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-navy focus:outline-none"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={(mobileMenuOpen ? faTimes : faBars) as IconProp} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-white/98 backdrop-blur-xl z-40 lg:hidden transition-all duration-300 flex flex-col pt-24 px-6 overflow-y-auto",
          mobileMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
              {item.hasDropdown ? (
                <div>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className="flex items-center justify-between w-full text-xl font-[Playfair_Display] font-bold text-navy"
                    >
                    {item.label}
                    <FontAwesomeIcon
                      icon={faChevronDown as IconProp}
                      className={cn("text-sm transition-transform duration-300", servicesDropdownOpen ? "rotate-180" : "")}
                    />
                    </button>
                  <div 
                    className={cn(
                      "mt-4 space-y-3 pl-4 overflow-hidden transition-all duration-300",
                      servicesDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                    >
                    {services.map((service, idx) => (
                      <Link key={idx} href={getLocalizedPath(service.path)}>
                        <span 
                          className="block text-gray-600 hover:text-italian-green py-2 text-base font-[Lora]"
                          onClick={closeMenu}
                        >
                          {service.title}
                        </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                <Link href={getLocalizedPath(item.path)}>
                  <span 
                    className={cn(
                      "block text-xl font-[Playfair_Display] font-bold transition-colors",
                      location === getLocalizedPath(item.path) ? "text-italian-green" : "text-navy"
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </span>
                  </Link>
                )}
              </div>
            ))}
          
          <div className="pt-8">
            <Link href={getLocalizedPath('/contact')}>
              <button 
                className="w-full btn-primary text-center justify-center py-4 text-lg"
                onClick={closeMenu}
              >
                {t('common.contactUs')}
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
