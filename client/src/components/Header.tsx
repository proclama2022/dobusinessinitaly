import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { buildLocalizedPath } from '@/lib/languagePaths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import gsap from 'gsap';

const timestamp = Date.now();
const logoDesktop = `/images/logonew.png?v=${timestamp}&t=${timestamp}`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock for mobile menu
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

  // ESC to close menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Dropdown animation
  useEffect(() => {
    if (!dropdownRef.current) return;
    if (servicesDropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [servicesDropdownOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const getLocalizedPath = (path: string) => buildLocalizedPath(path, i18n.language);

  const menuItems = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.about'), path: '/about' },
    { label: t('navigation.services'), path: '/services', hasDropdown: true },
    { label: t('navigation.blog'), path: '/blog' },
    { label: t('navigation.contact'), path: '/contact' }
  ];

  const services = [
    { title: 'Start Business Guide 2025', path: '/pillar/how-to-start-business-in-italy-2025', icon: '🚀' },
    { title: t('services.items.formation.title'), path: '/services/open-company-italy', icon: '🏢' },
    { title: t('services.items.accounting.title'), path: '/services/tax-accounting-expats', icon: '📊' },
    { title: t('services.items.partita_iva.title'), path: '/services/open-vat-number-italy', icon: '💼' },
    { title: t('services.items.regime_forfettario.title'), path: '/services', icon: '💵' }
  ];

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-card-dark py-2"
          : "bg-white/95 py-3"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href={getLocalizedPath('/')}
            className="flex-shrink-0 z-50 relative group magnetic"
            onClick={closeMenu}
          >
            <OptimizedImage
              src={logoDesktop}
              alt="Your Business in Italy"
              className="h-auto max-h-12 md:max-h-14 object-contain w-32 md:w-44 transition-transform duration-300 group-hover:scale-105"
              priority={true}
              width={176}
              height={56}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setServicesDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setServicesDropdownOpen(false)}
              >
                <Link
                  href={item.hasDropdown ? getLocalizedPath('/services') : getLocalizedPath(item.path)}
                >
                  <span
                    className={cn(
                      "relative px-4 py-2 text-xs font-headline font-semibold uppercase tracking-widest cursor-pointer transition-colors duration-300 inline-flex items-center gap-2",
                      isScrolled
                        ? location === getLocalizedPath(item.path)
                          ? "text-gold"
                          : "text-white/80 hover:text-white"
                        : location === getLocalizedPath(item.path)
                          ? "text-italian-green"
                          : "text-navy/80 hover:text-navy"
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown as IconProp}
                        className={cn(
                          "text-[8px] transition-transform duration-300",
                          servicesDropdownOpen && "rotate-180"
                        )}
                      />
                    )}
                    {/* Underline animation */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300",
                        isScrolled ? "bg-gold" : "bg-italian-green",
                        location === getLocalizedPath(item.path) ? "w-4" : "w-0 group-hover:w-4"
                      )}
                    />
                  </span>
                </Link>

                {/* Mega Dropdown */}
                {item.hasDropdown && servicesDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4",
                      "min-w-[320px]"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl shadow-2xl border overflow-hidden",
                        isScrolled
                          ? "bg-navy/95 backdrop-blur-xl border-white/10"
                          : "bg-white border-neutral-100"
                      )}
                    >
                      {services.map((service, idx) => (
                        <Link key={idx} href={getLocalizedPath(service.path)}>
                          <div
                            className={cn(
                              "flex items-center gap-4 px-6 py-4 transition-colors cursor-pointer group",
                              isScrolled
                                ? "hover:bg-white/5"
                                : "hover:bg-neutral-50"
                            )}
                          >
                            <span className="text-lg">{service.icon}</span>
                            <span
                              className={cn(
                                "flex-1 text-sm font-body transition-colors",
                                isScrolled
                                  ? "text-white/80 group-hover:text-white"
                                  : "text-navy/70 group-hover:text-navy"
                              )}
                            >
                              {service.title}
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronRight as IconProp}
                              className={cn(
                                "text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all",
                                isScrolled ? "text-gold" : "text-italian-green"
                              )}
                            />
                          </div>
                        </Link>
                      ))}

                      {/* CTA */}
                      <div
                        className={cn(
                          "p-4 border-t",
                          isScrolled ? "border-white/10" : "border-neutral-100"
                        )}
                      >
                        <Link href={getLocalizedPath('/services')}>
                          <button
                            className={cn(
                              "w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors",
                              isScrolled
                                ? "bg-gold text-navy hover:bg-gold-light"
                                : "bg-italian-green text-white hover:bg-italian-green-dark"
                            )}
                          >
                            View All Services
                            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSelector />

            <Link href={getLocalizedPath('/contact')}>
              <button
                className={cn(
                  "text-xs font-headline font-bold uppercase tracking-wider py-3 px-6 rounded-sm transition-all duration-300 whitespace-nowrap",
                  isScrolled
                    ? "bg-gold text-navy hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                    : "bg-italian-green text-white hover:bg-italian-green-dark hover:shadow-lg hover:shadow-italian-green/20"
                )}
              >
                {t('common.contactUs')}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3 z-50">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 focus:outline-none transition-colors",
                isScrolled ? "text-white" : "text-navy"
              )}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={(mobileMenuOpen ? faTimes : faBars) as IconProp}
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500 flex flex-col",
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <nav className="relative pt-24 px-6 overflow-y-auto max-h-full">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-white/10 last:border-0 py-4"
            >
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className="flex items-center justify-between w-full text-2xl font-display font-bold text-white"
                  >
                    {item.label}
                    <FontAwesomeIcon
                      icon={faChevronDown as IconProp}
                      className={cn(
                        "text-sm transition-transform duration-300",
                        servicesDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "mt-4 pl-4 space-y-3 overflow-hidden transition-all duration-300",
                      servicesDropdownOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {services.map((service, idx) => (
                      <Link key={idx} href={getLocalizedPath(service.path)}>
                        <span
                          className="flex items-center gap-3 text-white/70 hover:text-gold py-2 text-base font-body"
                          onClick={closeMenu}
                        >
                          <span>{service.icon}</span>
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
                      "block text-2xl font-display font-bold transition-colors",
                      location === getLocalizedPath(item.path)
                        ? "text-gold"
                        : "text-white hover:text-gold"
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="pt-8 pb-8">
            <Link href={getLocalizedPath('/contact')}>
              <button
                className="w-full bg-gold text-navy font-bold uppercase tracking-wider py-4 rounded-lg text-base"
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
