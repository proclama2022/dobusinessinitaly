import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import SEOHead from '@/components/SEOHead';
import { createLazyComponent } from '@/components/LazyComponent';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Lazy loading per componenti non critici (below the fold)
const ServicesSection = createLazyComponent(
  () => import('@/components/ServicesSection'),
  'h-64'
);

const MediaCoverageSection = createLazyComponent(
  () => import('@/components/MediaCoverageSection'),
  'h-48'
);

const BlogSection = createLazyComponent(
  () => import('@/components/BlogSection'),
  'h-96'
);

const FAQSection = createLazyComponent(
  () => import('@/components/FAQSection'),
  'h-80'
);

const NewsletterSection = createLazyComponent(
  () => import('@/components/NewsletterSection'),
  'h-32'
);

const ContactSection = createLazyComponent(
  () => import('@/components/ContactSection'),
  'h-96'
);

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
