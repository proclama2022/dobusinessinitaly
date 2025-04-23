import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Impostiamo un breve ritardo per garantire che l'animazione venga visualizzata
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-primary h-[500px] md:h-[600px] overflow-hidden">
      {/* Overlay con gradiente tricolore italiano */}
      <div className="absolute inset-0 italian-gradient opacity-10 z-[5]"></div>
      <div className="absolute inset-0 bg-black opacity-40 z-[2]"></div>
      <img 
        src="https://images.unsplash.com/photo-1613986922426-65e9e1bf539a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt={t('hero.backgroundAlt')} 
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      />
      
      {/* Elementi decorativi a bandiera italiana */}
      <div className="absolute top-0 left-0 h-full w-2 bg-[#009246] z-[5]"></div> {/* Verde */}
      <div className="absolute top-0 right-0 h-full w-2 bg-[#ce2b37] z-[5]"></div> {/* Rosso */}
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 
            className={`text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4 relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="relative">
              {t('hero.title')}
              <span className="absolute -bottom-2 left-0 right-0 h-1 italian-gradient opacity-90"></span>
            </span>
          </h1>
          <p 
            className={`text-xl text-white opacity-90 mb-8 max-w-xl ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {t('hero.subtitle')}
          </p>
          <div 
            className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <Link href="/contact" className="italian-border-gradient btn-secondary text-center animate-pulse-scale">
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
