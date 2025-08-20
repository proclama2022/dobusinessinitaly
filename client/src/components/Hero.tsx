import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { useLocalizedPath } from './LocalizedRouter';

const Hero = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Impostiamo un breve ritardo per garantire che l'animazione venga visualizzata
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background con immagine e overlay sfumato */}
      <div className="absolute inset-0 bg-black opacity-50 z-[2]"></div>
      <OptimizedImage
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        alt={t('hero.backgroundAlt')}
        className="absolute inset-0 w-full h-full scale-105 animate-slow-zoom z-[1]"
        priority={true}
        width={1920}
        height={1080}
        sizes="100vw"
        quality={85}
      />

      {/* Overlay con pattern decorativo */}
      <div className="absolute inset-0 opacity-10 z-[3]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '180px',
        }}
      ></div>

      {/* Overlay con sfumatura italiana */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00924630] via-transparent to-[#ce2b3730] z-[4] mix-blend-overlay"></div>

      {/* Elementi decorativi a bandiera italiana sui bordi */}
      <div className="absolute top-0 left-0 h-full w-2 bg-[#009246] z-[5] animate-slide-down"></div> {/* Verde */}
      <div className="absolute top-0 right-0 h-full w-2 bg-[#ce2b37] z-[5] animate-slide-down"></div> {/* Rosso */}

      {/* Barra decorativa superiore */}
      <div className="absolute top-0 inset-x-0 h-1 italian-gradient z-[5]"></div>

      {/* Elementi decorativi dinamici */}
      <div className="absolute top-[20%] left-[5%] w-16 h-16 rounded-full bg-[#00924620] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-[30%] right-[8%] w-24 h-24 rounded-full bg-[#ce2b3720] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-[15%] left-[15%] w-20 h-20 rounded-full bg-[#ffffff20] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl relative">
          {/* Badge italiane */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4 ${isLoaded ? 'animate-slide-right' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
            <span className="text-white text-xs font-medium">Made in Italy</span>
            <span className="w-2 h-2 rounded-full bg-[#ce2b37] ml-2"></span>
          </div>

          {/* Titolo principale */}
          <h1 className={`text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-4 relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <span className="relative inline-block">
              {t('hero.title')}
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 italian-gradient opacity-90 animate-shimmer"></span>
            </span>
          </h1>

          {/* Sottotitolo */}
          <p className={`text-xl text-white/85 mb-8 max-w-xl leading-relaxed ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Pulsanti di azione */}
          <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <Link
              href={getLocalizedPath('/contact')}
              className="relative overflow-hidden inline-block px-8 py-3 rounded-md bg-white text-primary font-medium text-center shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <span className="absolute inset-0 italian-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                {t('hero.contactButton')}
                <i className="fas fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0"></i>
              </span>
            </Link>
            <Link
              href={getLocalizedPath('/services')}
              className="btn-outline text-center border-2 border-white/50 hover:border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              {t('hero.servicesButton')}
            </Link>
          </div>

          {/* Decorazione angolare */}
          <div className={`absolute -bottom-12 -left-12 w-24 h-24 ${isLoaded ? 'animate-rotate-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="w-12 h-1 bg-[#009246] absolute top-0 left-0"></div>
            <div className="w-1 h-12 bg-[#009246] absolute top-0 left-0"></div>
          </div>
          <div className={`absolute -bottom-12 -right-12 w-24 h-24 ${isLoaded ? 'animate-rotate-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <div className="w-12 h-1 bg-[#ce2b37] absolute top-0 right-0"></div>
            <div className="w-1 h-12 bg-[#ce2b37] absolute top-0 right-0"></div>
          </div>
        </div>
      </div>

      {/* Fade-out al bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-[6]"></div>
    </section>
  );
};

export default Hero;
