import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import NextGenImage from './NextGenImage'; // Importa il componente NextGenImage
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faLinkedin,
  faTiktok,
  faYoutube,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import {
  faChevronRight,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
// Using new 3:1 aspect ratio logo from public directory with aggressive cache busting
const timestamp = Date.now();
const logoImage = `/images/logonew.png?v=${timestamp}&t=${timestamp}`;

const Footer = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Accento superiore sottile */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#009246] via-white/30 to-[#ce2b37]"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
              <NextGenImage
                src={logoImage}
                alt="Yourbusinessinitaly.com"
                className="h-auto w-80 md:w-96 mb-2 object-contain max-w-full"
                objectFit="contain"
              />
            </div>
            <p className="text-neutral-400 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-3 sm:space-x-4">
              {/* LinkedIn Company */}
              <a href="https://www.linkedin.com/company/partitaiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation focus:ring-2 focus:ring-neutral-500 outline-none" aria-label="LinkedIn Company">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-lg sm:text-base" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }} />
              </a>
              {/* LinkedIn Giovanni */}
              <a href="https://www.linkedin.com/in/studioemmicommercialista/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation focus:ring-2 focus:ring-neutral-500 outline-none" aria-label="LinkedIn Giovanni Emmi">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg sm:text-base" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }} />
              </a>
              <a href="https://www.tiktok.com/@partitaiva.it" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-neutral-700 hover:bg-black flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation focus:ring-2 focus:ring-neutral-500 outline-none">
                <FontAwesomeIcon icon={faTiktok} className="text-lg sm:text-base" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }} />
              </a>
              <a href="https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-neutral-700 hover:bg-[#FF0000] flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation focus:ring-2 focus:ring-neutral-500 outline-none">
                <FontAwesomeIcon icon={faYoutube} className="text-lg sm:text-base" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }} />
              </a>
              <a href="https://www.instagram.com/partitaiva.it/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-neutral-700 hover:bg-[#E1306C] flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation focus:ring-2 focus:ring-neutral-500 outline-none">
                <FontAwesomeIcon icon={faInstagram} className="text-lg sm:text-base" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }} />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.quickLinks')}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-700"></span>
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedPath('/')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group py-2 px-3 rounded-lg touch-manipulation active:bg-neutral-800 min-h-[44px] w-full outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-neutral-600">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }} />
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group py-2 px-3 rounded-lg touch-manipulation active:bg-neutral-800 min-h-[44px] w-full outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-neutral-600">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/about')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group py-2 px-3 rounded-lg touch-manipulation active:bg-neutral-800 min-h-[44px] w-full outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-neutral-600">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/blog')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group py-2 px-3 rounded-lg touch-manipulation active:bg-neutral-800 min-h-[44px] w-full outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-neutral-600">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('navigation.blog')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/contact')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group py-2 px-3 rounded-lg touch-manipulation active:bg-neutral-800 min-h-[44px] w-full outline-none focus:bg-neutral-800 focus:ring-2 focus:ring-neutral-600">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.services')}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-700"></span>
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.formation.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.accounting.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.tax.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.planning.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.payroll.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                  {t('services.items.legal.title')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.contact')}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-700"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }} />
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors pt-1">
                  {t('contact.info.address.value')}
                </span>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <FontAwesomeIcon icon={faPhoneAlt} className="text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }} />
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors pt-1">
                  {t('contact.info.phone.value')}
                </span>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <FontAwesomeIcon icon={faEnvelope} className="text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }} />
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors pt-1">
                  {t('contact.info.email.value')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">© {currentYear} Yourbusinessinitaly.com. {t('footer.copyright')}</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href={getLocalizedPath('/privacy-policy')} className="text-neutral-400 hover:text-white text-sm transition-colors hover:underline">{t('footer.privacy')}</Link>
              <Link href={getLocalizedPath('/cookie-policy')} className="text-neutral-400 hover:text-white text-sm transition-colors hover:underline">{t('footer.cookies')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
