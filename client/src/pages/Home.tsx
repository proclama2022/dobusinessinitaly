import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
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
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Home;
