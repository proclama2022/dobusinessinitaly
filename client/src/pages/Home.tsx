import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = 'Yourbusinessinitaly.com - Studio Commercialisti';
  }, []);

  return (
    <>
      <SEOHead 
        title="Yourbusinessinitaly.com - Studio Commercialisti"
        description="Servizi professionali per fare business in Italia. Consulenza fiscale, contabile e legale per aziende internazionali."
        alternates={{
          'en': 'https://yourbusinessinitaly.com/en/',
          'fr': 'https://yourbusinessinitaly.com/fr/',
          'de': 'https://yourbusinessinitaly.com/de/'
        }}
        lang="it"
      />
      <Hero />
      <StatsSection />
      <WhyChooseUs />
      <ServicesSection />
      <MediaCoverageSection maxItems={4} />
      <ContactSection />
    </>
  );
};

export default Home;
