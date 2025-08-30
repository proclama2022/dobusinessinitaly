import React from 'react';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';

const Media = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <SEOHead
        title={t('media.pageTitle', 'Parlano di Noi - Yourbusinessinitaly.com')}
        description={t('media.pageDescription', 'Scopri cosa dicono di Yourbusinessinitaly.com la stampa e i media specializzati nel settore economico-finanziario.')}
        canonicalUrl={`/${currentLang}/media`}
        keywords="media, rassegna stampa, yourbusinessinitaly, citazioni stampa, interviste, riconoscimenti, premi, forbes"
        lang={currentLang}
        alternates={{
          it: 'https://yourbusinessinitaly.com/it/media',
          en: 'https://yourbusinessinitaly.com/en/media',
          fr: 'https://yourbusinessinitaly.com/fr/media',
          de: 'https://yourbusinessinitaly.com/de/media',
          es: 'https://yourbusinessinitaly.com/es/media',
          'x-default': 'https://yourbusinessinitaly.com/it/media'
        }}
      />

      {/* Hero Section */}
      <section className="relative isolate h-[500px] md:h-[600px] overflow-hidden">
        {/* Background con immagine e overlay sfumato */}
        <div className="absolute inset-0 bg-black opacity-60 z-[2]"></div>
        <OptimizedImage
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
          alt="Media coverage e riconoscimenti"
          className="absolute inset-0 w-full h-full scale-105 animate-slow-zoom z-[1]"
          priority={true}
          width={1920}
          height={1080}
          sizes="100vw"
          quality={85}
        />
        
        {/* Contenuto Hero */}
        <div className="absolute inset-0 z-[3] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                {t('media.heroTitle', 'Parlano di Noi')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                {t('media.heroSubtitle', 'Riconoscimenti, pubblicazioni e menzioni nella stampa specializzata che testimoniano la nostra eccellenza nei servizi professionali.')}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                  <i className="fas fa-trophy mr-2"></i>
                  {t('media.badge1', 'Forbes Italia 2024')}
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                  <i className="fas fa-medal mr-2"></i>
                  {t('media.badge2', 'Politecnico Milano 2014')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradiente italiano decorativo in basso */}
        <div className="absolute bottom-0 left-0 right-0 h-2 italian-gradient z-[4]"></div>
      </section>

      <MediaCoverageSection />
      <ContactSection />
    </>
  );
};

export default Media;