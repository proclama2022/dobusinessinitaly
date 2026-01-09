import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ContactSection from '@/components/ContactSection';
import GoogleMap from '@/components/GoogleMap';
import SEOHead from '@/components/SEOHead';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import { buildLocalizedPath } from '@/lib/languagePaths';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.contact')} - Yourbusinessinitaly.com`;
  }, [t]);

  return (
    <>
      <SEOHead
        title={`${t('navigation.contact')} - Yourbusinessinitaly.com`}
        description={t('contact.subtitle')}
        canonicalUrl={buildLocalizedPath('/contact', currentLang)}
        keywords="contatti, consulenza, informazioni, yourbusinessinitaly"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/contact',
          en: 'https://yourbusinessinitaly.com/contact',
          fr: 'https://yourbusinessinitaly.com/fr/contact',
          de: 'https://yourbusinessinitaly.com/de/contact',
          es: 'https://yourbusinessinitaly.com/es/contact',
          'x-default': 'https://yourbusinessinitaly.com/contact'
        }}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('navigation.contact'),
          url: `https://yourbusinessinitaly.com/${currentLang}/contact`,
        }}
      />
      
      {/* Hero Section con Immagine di Sfondo */}
      <div className="relative py-32 overflow-hidden bg-navy">
        {/* Immagine di sfondo con overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40 z-10"></div>
          <img 
            src="/images/office-catania.webp" 
            alt="Your Business in Italy Office" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl animate-fade-in">
            <span className="inline-block px-4 py-2 border border-italian-green/50 text-italian-green font-outfit text-xs uppercase tracking-[0.2em] bg-navy/50 backdrop-blur-sm mb-6">
              {t('navigation.contact')}
            </span>
            <h1 className="text-5xl md:text-7xl font-instrument font-bold text-white mb-8 leading-tight">
              {t('contact.title')}
            </h1>
            <div className="w-24 h-1 bg-italian-green mb-8"></div>
            <p className="text-[#e6e2dd] text-xl md:text-2xl font-outfit leading-relaxed max-w-2xl border-l-2 border-italian-green pl-6 italic">
              {t('contact.subtitle')}
            </p>
            
            {/* CTA veloce */}
            <div className="flex flex-wrap gap-6 mt-12">
              <div className="flex flex-col border-l border-white/20 pl-6">
                <span className="text-3xl font-instrument font-bold text-white">30 min</span>
                <span className="text-sm font-outfit text-italian-green uppercase tracking-wider">Free Consultation</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-6">
                <span className="text-3xl font-instrument font-bold text-white">48h</span>
                <span className="text-sm font-outfit text-italian-green uppercase tracking-wider">Response Time</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-6">
                <span className="text-3xl font-instrument font-bold text-white">5★</span>
                <span className="text-sm font-outfit text-italian-green uppercase tracking-wider">Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />

      {/* Mappa con Design Moderno */}
      <section className="py-20 bg-[#f8f9fa] border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
               <span className="text-italian-green font-outfit font-semibold tracking-[0.2em] text-xs uppercase mb-4 block">Our Location</span>
               <h2 className="text-4xl font-instrument font-bold text-navy mb-6">
              {t('contact.map.title')}
            </h2>
               <p className="text-neutral-600 font-outfit mb-8 leading-relaxed">
                 {t('contact.map.subtitle') || 'Find us in the heart of Catania, Sicily. Our offices are located in the historic center, easily accessible and surrounded by the beauty of Italian architecture.'}
            </p>
               <Link href="https://maps.app.goo.gl/yourLinkHere" target="_blank" className="btn-outline border-navy text-navy hover:bg-navy hover:text-white">
                  Get Directions
               </Link>
          </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-2 shadow-xl border border-neutral-100 rounded-sm">
                <div className="grayscale hover:grayscale-0 transition-all duration-700 h-[400px]">
              <GoogleMap />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
