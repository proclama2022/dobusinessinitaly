import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import NextGenImage from './NextGenImage';
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
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const timestamp = Date.now();
const logoImage = `/images/logonew.png?v=${timestamp}&t=${timestamp}`;

const Footer = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.about'), path: '/about' },
    { label: t('navigation.services'), path: '/services' },
    { label: t('navigation.blog'), path: '/blog' },
    { label: t('navigation.contact'), path: '/contact' },
  ];

  const legalLinks = [
    { label: t('footer.privacy') || 'Privacy Policy', path: '/privacy-policy' },
    { label: t('footer.cookies') || 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Legal Notice', path: '/legal' }
  ];

  return (
    <footer className="bg-navy text-white pt-20 pb-10 relative overflow-hidden border-t-4 border-italian-green">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
          <circle cx="100" cy="0" r="50" stroke="white" strokeWidth="0.5" />
          <circle cx="100" cy="0" r="70" stroke="white" strokeWidth="0.5" />
          <circle cx="100" cy="0" r="90" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-8">
              <NextGenImage
                src={logoImage}
                alt="Yourbusinessinitaly.com"
                className="h-auto w-64 mb-4 object-contain brightness-0 invert"
                objectFit="contain"
              />
            </div>
            <p className="text-neutral-400 mb-8 font-[Lora] leading-relaxed max-w-xs border-l-2 border-italian-green pl-4">
              {t('footer.tagline')}
            </p>
            
            <div className="flex space-x-3">
              {[
                { icon: faLinkedinIn, url: "https://www.linkedin.com/company/partitaiva", label: "LinkedIn Company" },
                { icon: faLinkedin, url: "https://www.linkedin.com/in/studioemmicommercialista/", label: "Giovanni Emmi" },
                { icon: faInstagram, url: "https://www.instagram.com/partitaiva.it/", label: "Instagram" },
                { icon: faYoutube, url: "https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg", label: "YouTube" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-italian-green hover:border-italian-green hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-neutral-400 group-hover:text-white transition-colors" />
              </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-[Playfair_Display] font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-italian-green"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={getLocalizedPath(link.path)}>
                    <span className="text-neutral-400 hover:text-italian-green transition-colors flex items-center group cursor-pointer font-[Montserrat] text-sm tracking-wide">
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px] mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-italian-green" />
                      {link.label}
                    </span>
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-[Playfair_Display] font-bold mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-italian-green"></span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1 mr-4 text-italian-green">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm" />
                </div>
                <span className="text-neutral-400 text-sm leading-relaxed font-[Lora]">
                  Via Etnea 290,<br />
                  95131 Catania (CT),<br />
                  Italy
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1 mr-4 text-italian-green">
                  <FontAwesomeIcon icon={faPhoneAlt} className="text-sm" />
                </div>
                <a href="tel:+39095643533" className="text-neutral-400 hover:text-italian-green transition-colors text-sm mt-1.5 font-[Montserrat]">
                  +39 095 643533
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1 mr-4 text-italian-green">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </div>
                <a href="mailto:amministrazione@proclama.co" className="text-neutral-400 hover:text-italian-green transition-colors text-sm mt-1.5 break-all font-[Montserrat]">
                  amministrazione@proclama.co
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Newsletter */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-[Playfair_Display] font-bold mb-8 relative inline-block">
              Legal Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-italian-green"></span>
            </h3>
            <ul className="space-y-4 mb-8">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={getLocalizedPath(link.path)}>
                    <span className="text-neutral-400 hover:text-italian-green transition-colors text-sm cursor-pointer font-[Montserrat]">
                      {link.label}
                </span>
                  </Link>
              </li>
              ))}
            </ul>

            <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-xs text-neutral-400 mb-2">Partita IVA / VAT Number:</p>
              <p className="text-white font-mono tracking-wider">IT05912380875</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-[Montserrat]">
          <p>&copy; {currentYear} Studio Emmi. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Designed with <span className="text-italian-red mx-1">❤️</span> in Sicily
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
