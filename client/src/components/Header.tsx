import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useLanguagePrefix } from '@/hooks/use-language-prefix';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const { getLocalizedPath, pathWithoutLanguage } = useLanguagePrefix();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Verifica se il link è attivo in base al percorso attuale senza prefisso linguistico
  const isActiveLink = (path: string) => {
    // Confronta il percorso senza il prefisso linguistico
    return path === '/' ? pathWithoutLanguage === '/' : pathWithoutLanguage === path;
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
            <Link href="/" className="text-2xl font-heading font-bold text-primary">
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
                href={link.path}
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
                href={link.path}
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
