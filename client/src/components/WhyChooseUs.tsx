import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/components/LocalizedRouter';
import OptimizedImage from './OptimizedImage';

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
  const { getLocalizedPath } = useLocalizedPath();

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
    <section id="about" className="section-padding bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="section-title mb-6">{t('whyChooseUs.title')}</h2>
            
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
            
            <Link href={getLocalizedPath('/contact')} className="btn-primary inline-block mt-8">
              {t('whyChooseUs.ctaButton')}
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                alt={t('whyChooseUs.mainImageAlt')}
                className="rounded-lg shadow-xl w-full h-[500px]"
                width={1000}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                srcSet="
                  https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=640&q=75 640w,
                  https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80 1000w,
                  https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80 1600w
                "
                quality={80}
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md border border-neutral-200 hidden md:block">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=75"
                  alt={t('whyChooseUs.smallImageAlt')}
                  className="w-48 h-48 rounded"
                  width={300}
                  height={300}
                  sizes="192px"
                  srcSet="
                    https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=192&q=70 192w,
                    https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=384&q=75 384w
                  "
                  quality={75}
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
