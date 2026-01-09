import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faCertificate,
  faHandshake,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import OptimizedImage from './OptimizedImage';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const features = [
    {
      icon: faGlobe,
      title: t('whyChooseUs.features.international.title'),
      description: t('whyChooseUs.features.international.description')
    },
    {
      icon: faCertificate,
      title: t('whyChooseUs.features.excellence.title'),
      description: t('whyChooseUs.features.excellence.description')
    },
    {
      icon: faHandshake,
      title: t('whyChooseUs.features.approach.title'),
      description: t('whyChooseUs.features.approach.description')
    },
    {
      icon: faBolt,
      title: t('whyChooseUs.features.reliability.title'),
      description: t('whyChooseUs.features.reliability.description')
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-italian-green/10 flex items-center justify-center text-italian-green group-hover:bg-italian-green group-hover:text-white transition-all duration-300">
                    <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-italian-green transition-colors font-instrument">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-outfit">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pl-[4.5rem]">
              <Link href={getLocalizedPath('/contact')}>
                <button className="bg-italian-green text-white font-bold text-sm uppercase tracking-widest py-4 px-10 rounded-sm hover:bg-italian-green-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  {t('whyChooseUs.ctaButton')}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Image & Quote */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border-8 border-white">
              <div className="aspect-[4/5] relative bg-gray-100">
                {/* Replaced Placeholder with Real Image */}
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                  alt="Business Meeting in Italy"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  width={800}
                  height={1000}
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Floating Quote Card */}
            <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white p-8 rounded-sm shadow-xl max-w-sm border-l-4 border-italian-green z-10 hidden md:block group/quote hover:shadow-2xl transition-shadow duration-500">
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-6xl text-italian-green/10 font-serif pointer-events-none">"</span>
                <p className="font-instrument text-xl text-navy italic mb-4 leading-relaxed relative z-10">
                  {t('whyChooseUs.quote.text')}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-italian-green/30"></div>
                  <p className="text-italian-green text-[10px] font-bold uppercase tracking-[0.2em] font-outfit">
                    {t('whyChooseUs.quote.author')}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-italian-green/5 rounded-full z-[-1] blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
