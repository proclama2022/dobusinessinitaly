import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mt-1">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
          <i className={icon}></i>
        </span>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-heading font-medium text-neutral-800">{title}</h3>
        <p className="mt-1 text-neutral-600">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'fas fa-globe',
      title: t('whyChooseUs.features.international.title'),
      description: t('whyChooseUs.features.international.description')
    },
    {
      icon: 'fas fa-certificate',
      title: t('whyChooseUs.features.excellence.title'),
      description: t('whyChooseUs.features.excellence.description')
    },
    {
      icon: 'fas fa-handshake',
      title: t('whyChooseUs.features.approach.title'),
      description: t('whyChooseUs.features.approach.description')
    },
    {
      icon: 'fas fa-bolt',
      title: t('whyChooseUs.features.reliability.title'),
      description: t('whyChooseUs.features.reliability.description')
    }
  ];

  return (
    <section id="about" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-6">
              {t('whyChooseUs.title')}
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
            
            <Link href="/contact" className="btn-primary inline-block mt-8">
              {t('whyChooseUs.ctaButton')}
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt={t('whyChooseUs.mainImageAlt')} 
                className="rounded-lg shadow-xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt={t('whyChooseUs.smallImageAlt')} 
                  className="w-48 h-48 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
