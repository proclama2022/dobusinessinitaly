import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from './LocalizedRouter';
// Using the new 3:1 aspect ratio logo from public directory
const logoImage = '/images/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#212529] to-[#343a40] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Elementi decorativi con la bandiera italiana */}
      <div className="absolute top-0 inset-x-0 h-2 italian-gradient"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#009246]"></div>
      <div className="absolute bottom-0 left-1/3 w-1/3 h-1 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-[#ce2b37]"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
              <img
                src={logoImage}
                alt="Yourbusinessinitaly.com"
                className="h-auto w-56 mb-2 object-contain max-w-full"
                onError={(e) => {
                  // Fallback al testo se l'immagine non può essere caricata
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <h3 className="text-xl font-heading font-medium relative inline-block">
                      <span className="relative italic">
                        Yourbusinessinitaly.com
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
                      </span>
                    </h3>
                  `;
                }}
              />
            </div>
            <p className="text-neutral-400 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-linkedin-in" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }}></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-twitter" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }}></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-facebook-f" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }}></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-700 hover:italian-gradient flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-instagram" style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'auto',
                  filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
                  transform: 'translateZ(0)'
                }}></i>
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.quickLinks')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedPath('/')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }}></i>
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/about')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/blog')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('navigation.blog')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/contact')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.services')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.formation.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.accounting.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.tax.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.planning.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.payroll.title')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/services')} className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                  {t('services.items.legal.title')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-heading font-medium mb-4 relative inline-block">
              <span className="relative">
                {t('footer.contact')}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 italian-gradient"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <i className="fas fa-map-marker-alt text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }}></i>
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors pt-1">
                  {t('contact.info.address.value')}
                </span>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <i className="fas fa-phone-alt text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }}></i>
                </div>
                <span className="text-neutral-400 group-hover:text-white transition-colors pt-1">
                  {t('contact.info.phone.value')}
                </span>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-neutral-700 group-hover:italian-gradient flex items-center justify-center mr-3 transition-all">
                  <i className="fas fa-envelope text-neutral-300" style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'auto',
                    filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.1))',
                    transform: 'translateZ(0)'
                  }}></i>
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
