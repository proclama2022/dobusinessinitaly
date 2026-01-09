import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { buildLocalizedPath } from '@/lib/languagePaths';

const Home = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Commercialista per Stranieri | Apertura Società Italia"
        description="Commercialista per stranieri in Italia. Apertura società, partita IVA e regime forfettario. Consulenza fiscale in inglese. Richiedi preventivo in 24h."
        keywords="commercialista stranieri Italia, aprire società Italia, partita iva stranieri, regime forfettario, consulenza fiscale internazionale"
        canonicalUrl={buildLocalizedPath('/', currentLang)}
        alternates={{
          'it': 'https://yourbusinessinitaly.com/it',
          'en': 'https://yourbusinessinitaly.com/',
          'fr': 'https://yourbusinessinitaly.com/fr',
          'de': 'https://yourbusinessinitaly.com/de',
          'es': 'https://yourbusinessinitaly.com/es'
        }}
        lang={currentLang}
      />
      <Hero />
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <StatsSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <WhyChooseUs />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <ServicesSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <MediaCoverageSection maxItems={4} />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <BlogSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <FAQSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <NewsletterSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
