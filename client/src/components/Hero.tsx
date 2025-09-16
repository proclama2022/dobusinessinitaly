import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import NextGenImage from './NextGenImage';
import { useLocalizedPath } from './LocalizedRouter';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [isLoaded, setIsLoaded] = useState(false);

  // Safe defaults in case translations resolve to empty strings at runtime
  const defaultTitle = 'Accounting Expertise For Your Global Business';
  const defaultSubtitle =
    'We assist foreign companies and investors in successfully managing their business in Italy, providing excellence in tax and commercial consulting.';

  // Prefer explicit key lookup so we can safely fallback when i18n returns empty/null
  const heroTitle = t('hero.title') || defaultTitle;
  const heroSubtitle = t('hero.subtitle') || defaultSubtitle;

  useEffect(() => {
    // Small debug in non-production to observe resolved translations and current language
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[Hero] language=', i18n?.language, 'heroTitle=', heroTitle, 'heroSubtitle=', heroSubtitle);
    }

    // Impostiamo un breve ritardo per garantire che l'animazione venga visualizzata
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [i18n?.language, heroTitle, heroSubtitle]);

  return (
    <section className="relative isolate min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] overflow-hidden">
      {/* Background con immagine e overlay sfumato */}
      <div className="absolute inset-0 bg-black opacity-50 z-[2]"></div>
      <NextGenImage
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85"
        alt={t('hero.backgroundAlt')}
        className="absolute inset-0 w-full h-full object-cover hero-image z-[1]"
        priority={true}
        width={1920}
        height={1080}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, 1920px"
        quality={90}
      />

      {/* Overlay con pattern decorativo */}
      <div className="absolute inset-0 opacity-10 z-[3]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '180px',
        }}
      ></div>

      {/* Overlay con sfumatura italiana */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00924630] via-transparent to-[#ce2b3730] z-[4] mix-blend-normal"></div>

      {/* Elementi decorativi a bandiera italiana sui bordi */}
      <div className="hidden sm:block absolute top-0 left-0 h-full w-2 bg-[#009246] z-[5] animate-slide-down"></div> {/* Verde */}
      <div className="hidden sm:block absolute top-0 right-0 h-full w-2 bg-[#ce2b37] z-[5] animate-slide-down"></div> {/* Rosso */}

      {/* Barra decorativa superiore */}
      <div className="absolute top-0 inset-x-0 h-1 italian-gradient z-[5]"></div>

      {/* Elementi decorativi dinamici */}
      <div className="hidden sm:block absolute top-[20%] left-[5%] w-16 h-16 rounded-full bg-[#00924620] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '8s' }}></div>
      <div className="hidden sm:block absolute top-[30%] right-[8%] w-24 h-24 rounded-full bg-[#ce2b3720] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      <div className="hidden sm:block absolute bottom-[15%] left-[15%] w-20 h-20 rounded-full bg-[#ffffff20] mix-blend-overlay animate-float z-[4]" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>


      <div className="container mx-auto px-4 h-full flex items-center relative z-[100] mix-blend-normal">
        <div className="max-w-2xl relative">
          {/* Badge italiane */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4 ${isLoaded ? 'animate-slide-right' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-[#009246] mr-2"></span>
            <span className="text-white text-xs font-medium">Made in Italy</span>
            <span className="w-2 h-2 rounded-full bg-[#ce2b37] ml-2"></span>
          </div>

          {/* Titolo principale */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 relative z-20 enhanced-text">
            <span className="relative inline-block">
              {heroTitle}
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-red-500 opacity-90"></span>
            </span>
          </h1>

          {/* Sottotitolo */}
          <p className="text-base sm:text-xl text-white mb-8 max-w-xl leading-relaxed z-20 relative enhanced-text">
            {heroSubtitle}
          </p>

          {/* Pulsanti di azione */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 z-20 relative">
            <Link
              href={getLocalizedPath('/contact')}
              className="inline-block px-8 py-3 rounded-md bg-white text-gray-800 font-medium text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50"
            >
              {t('hero.contactButton', 'Contact Us')}
            </Link>
            <Link
              href={getLocalizedPath('/services')}
              className="inline-block px-8 py-3 rounded-md border-2 border-white text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              {t('hero.servicesButton', 'Discover Our Services')}
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
