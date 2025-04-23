import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

const Footer = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">DoBusinessNew</h3>
            <p className="text-neutral-400 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors">{t('navigation.home')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('navigation.services')}</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">{t('navigation.about')}</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">{t('navigation.blog')}</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">{t('navigation.contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.formation.title')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.accounting.title')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.tax.title')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.planning.title')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.payroll.title')}</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-white transition-colors">{t('services.items.legal.title')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-medium mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-neutral-400"></i>
                <span className="text-neutral-400">{t('contact.info.address.value')}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-neutral-400"></i>
                <span className="text-neutral-400">{t('contact.info.phone.value')}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-neutral-400"></i>
                <span className="text-neutral-400">{t('contact.info.email.value')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">© {currentYear} DoBusinessNew. {t('footer.copyright')}</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">{t('footer.terms')}</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">{t('footer.cookies')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
