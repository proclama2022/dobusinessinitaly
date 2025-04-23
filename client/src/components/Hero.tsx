import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-primary h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <img 
        src="https://images.unsplash.com/photo-1613986922426-65e9e1bf539a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt={t('hero.backgroundAlt')} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white opacity-90 mb-8 max-w-xl">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="btn-secondary text-center">
              {t('hero.contactButton')}
            </Link>
            <Link href="/services" className="btn-outline text-center">
              {t('hero.servicesButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
