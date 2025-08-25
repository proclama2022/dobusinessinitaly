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

const Home = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = 'Commercialista per Stranieri in Italia | Apertura Società e Partita IVA';
  }, []);

  return (
    <>
      <SEOHead
        title="Commercialista per Stranieri in Italia | Apertura Società e Partita IVA"
        description="Commercialista specializzato per stranieri in Italia. Apertura società, partita IVA, regime forfettario. Consulenza fiscale in inglese. Preventivo gratuito in 24h."
        keywords="commercialista stranieri Italia, aprire società Italia, partita iva stranieri, regime forfettario, consulenza fiscale internazionale"
        canonicalUrl={`/${currentLang}/`}
        alternates={{
          'it': 'https://yourbusinessinitaly.com/it/',
          'en': 'https://yourbusinessinitaly.com/en/',
          'fr': 'https://yourbusinessinitaly.com/fr/',
          'de': 'https://yourbusinessinitaly.com/de/',
          'es': 'https://yourbusinessinitaly.com/es/'
        }}
        lang={currentLang}
      />
      <Hero />
      <StatsSection />
      <WhyChooseUs />
      <ServicesSection />
      <MediaCoverageSection maxItems={4} />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Home;
