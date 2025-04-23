import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Set page title
    document.title = `${t('navigation.about')} - DoBusinessNew`;
  }, [t]);

  return (
    <>
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white text-center">
            {t('navigation.about')}
          </h1>
          <p className="text-white/80 text-center mt-4 max-w-2xl mx-auto">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-6">
                DoBusinessNew
              </h2>
              <p className="text-neutral-600 mb-4 text-lg">
                {t('footer.tagline')}
              </p>
              <p className="text-neutral-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
              <p className="text-neutral-600 mb-4">
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Our team" 
                className="rounded-lg shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
      
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
              Il Nostro Team
            </h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Un team di professionisti dedicati a fornire servizi di eccellenza.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg text-center">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-heading font-medium text-neutral-800">Marco Rossi</h3>
                <p className="text-primary">CEO & Founder</p>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg text-center">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-heading font-medium text-neutral-800">Laura Bianchi</h3>
                <p className="text-primary">Tax Consultant</p>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg text-center">
              <img 
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-heading font-medium text-neutral-800">Alessandro Verdi</h3>
                <p className="text-primary">International Advisor</p>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg text-center">
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-heading font-medium text-neutral-800">Giulia Neri</h3>
                <p className="text-primary">Accounting Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default About;
