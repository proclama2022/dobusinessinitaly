import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import MediaCoverageSectionNew from '@/components/MediaCoverageSectionNew';
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
      <MediaCoverageSectionNew />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default Home;
