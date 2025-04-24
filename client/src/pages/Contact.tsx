import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.contact')} - DoBusinessNew`;
  }, [t]);

  return (
    <>
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white text-center">
            {t('contact.title')}
          </h1>
          <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      <ContactSection />
      
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
              {t('contact.map.title')}
            </h2>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.211381461838!2d9.191012776593187!3d45.46512933583656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6aec34636a1%3A0xab7f4e27101a2e19!2sVia%20Roma%2C%20Milano%20MI!5e0!3m2!1sit!2sit!4v1684759287682!5m2!1sit!2sit" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={t('contact.map.titleAlt')}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
