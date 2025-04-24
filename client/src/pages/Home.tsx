import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = 'DoBusinessNew - Studio Commercialisti';
  }, []);

  return (
    <>
      <Hero />
      <StatsSection />
      <WhyChooseUs />
      <ServicesSection />
      <MediaCoverageSection />
      <BlogSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Home;
