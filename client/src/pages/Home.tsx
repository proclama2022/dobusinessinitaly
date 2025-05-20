import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = 'Dobusinessinitaly.com - Studio Commercialisti';
  }, []);

  return (
    <>
      <Hero />
      <StatsSection />
      <WhyChooseUs />
      <ServicesSection />
      <MediaCoverageSection maxItems={4} />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default Home;
