import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useRef } from 'react';
import NextGenImage from './NextGenImage';
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { companyData } from '@/data/company';
import {
  faLinkedinIn,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faArrowRight,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

const timestamp = Date.now();
const logoImage = `/images/logonew.png?v=${timestamp}`;

const Footer = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const footerRef = useRef<HTMLElement>(null);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.about'), path: '/about' },
    { label: t('navigation.services'), path: '/services' },
    { label: t('navigation.blog'), path: '/blog' },
    { label: t('navigation.contact'), path: '/contact' }
  ];

  const legalLinks = [
    { label: t('footer.privacy') || 'Privacy Policy', path: '/privacy-policy' },
    { label: t('footer.cookies') || 'Cookie Policy', path: '/cookie-policy' }
  ];

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Entrance animation
  useEffect(() => {
    if (!footerRef.current) return;

    const columns = footerRef.current.querySelectorAll('.footer-col');
    gsap.fromTo(
      columns,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-navy text-white pt-24 pb-8 overflow-hidden"
    >
      {/* Top accent line - NOT straight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-italian-green via-gold to-italian-red" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-60" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 border border-white/5 rounded-full" />
      <div className="absolute top-40 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Grid - NOT symmetric */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 mb-20">

          {/* Brand Column - Wider */}
          <div className="footer-col lg:w-[35%]">
            <NextGenImage
              src={logoImage}
              alt="Your Business in Italy"
              className="h-12 w-auto mb-8 brightness-0 invert"
              objectFit="contain"
            />

            <p className="text-white/60 font-body leading-relaxed mb-10 max-w-sm text-sm">
              {t('footer.tagline')}
            </p>

            {/* Social - Horizontal */}
            <div className="flex gap-3">
              {[
                { icon: faLinkedinIn, url: 'https://www.linkedin.com/company/partitaiva' },
                { icon: faInstagram, url: 'https://www.instagram.com/partitaiva.it/' },
                { icon: faYoutube, url: 'https://www.youtube.com/channel/UCggYXro7p7chs4MvrMcLSvg' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group magnetic"
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="text-white/60 group-hover:text-navy transition-colors text-sm"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links - NOT equal width */}
          <div className="footer-col lg:w-[20%]">
            <h3 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-gold mb-8">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={getLocalizedPath(link.path)}>
                    <span className="text-white/60 hover:text-white transition-colors flex items-center group cursor-pointer font-body text-sm">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-[8px] mr-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold"
                      />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col lg:w-[25%]">
            <h3 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-gold mb-8">
              Contact
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-gold">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs" />
                </div>
                <span className="text-white/60 text-sm leading-relaxed font-body">
                  {companyData.address.street}, {companyData.address.postalCode} {companyData.address.city}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-gold">
                  <FontAwesomeIcon icon={faPhoneAlt} className="text-xs" />
                </div>
                <a
                  href={`tel:${companyData.contact.phone.replace(/\s/g, '')}`}
                  className="text-white/60 hover:text-white transition-colors text-sm font-body"
                >
                  {companyData.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-gold">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                </div>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="text-white/60 hover:text-white transition-colors text-sm font-body break-all"
                >
                  {companyData.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + VAT */}
          <div className="footer-col lg:w-[20%]">
            <h3 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-gold mb-8">
              Legal
            </h3>
            <ul className="space-y-4 mb-8">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={getLocalizedPath(link.path)}>
                    <span className="text-white/60 hover:text-white transition-colors cursor-pointer font-body text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* VAT Box - Glass */}
            <div className="glass-card p-5 rounded-xl">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">VAT Number</p>
              <p className="text-white font-mono text-sm tracking-wide">{companyData.vatNumber}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-body">
            © {currentYear} Studio Emmi. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-white/40 flex items-center gap-2">
              Made with <span className="text-italian-red">♥</span> in Sicily
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all duration-300"
              aria-label="Back to top"
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className="text-white/60 group-hover:text-navy transition-colors text-xs"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
