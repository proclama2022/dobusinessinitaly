import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ServicesSection from '@/components/ServicesSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';

const Services = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.services')} - DoBusinessNew`;
  }, [t]);

  return (
    <>
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white text-center">
            {t('services.title')}
          </h1>
          <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </div>
      
      <ServicesSection />
      
      <div className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
              {t('whyChooseUs.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <i className="fas fa-globe text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
                {t('whyChooseUs.features.international.title')}
              </h3>
              <p className="text-neutral-600">
                {t('whyChooseUs.features.international.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <i className="fas fa-certificate text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
                {t('whyChooseUs.features.excellence.title')}
              </h3>
              <p className="text-neutral-600">
                {t('whyChooseUs.features.excellence.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <i className="fas fa-handshake text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
                {t('whyChooseUs.features.approach.title')}
              </h3>
              <p className="text-neutral-600">
                {t('whyChooseUs.features.approach.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <i className="fas fa-bolt text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-heading font-medium text-neutral-800 mb-3">
                {t('whyChooseUs.features.reliability.title')}
              </h3>
              <p className="text-neutral-600">
                {t('whyChooseUs.features.reliability.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Services;
