import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from './LocalizedRouter';
import { cn } from '@/lib/utils';

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

    return () => {
      clearTimeout(timer);
    };
  }, [i18n?.language, heroTitle, heroSubtitle]);

  return (
    <section className="relative isolate min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center overflow-hidden bg-neutral-900">
      {/* Background con immagine e overlay minimal */}
      <div className="absolute inset-0 bg-neutral-900/60 z-[2]"></div>
      <OptimizedImage
        src="/images/heronew.png"
        alt="Commercialista per stranieri in Italia"
        className="absolute inset-0 w-full h-full object-cover hero-image z-[1]"
        priority={true}
        width={1920}
        height={1080}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, 1920px"
      />

      {/* Content Container - Minimal Layout */}
      <div className="container mx-auto px-4 h-full relative z-[10]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Titolo principale - Clean Typography */}
          <h1 className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8 transition-all duration-700 ease-out",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            {heroTitle}
          </h1>

          {/* Sottotitolo - Readable & Clear */}
          <p className={cn(
            "text-lg sm:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ease-out",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            {heroSubtitle}
          </p>

          {/* Pulsanti di azione - Minimal Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-200 ease-out",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            <Link
              href={getLocalizedPath('/contact')}
              className="btn-primary w-full sm:w-auto min-w-[160px] text-lg py-4 shadow-none hover:translate-y-0 hover:opacity-90"
            >
              {t('hero.contactButton', 'Contact Us')}
            </Link>
            
            <Link
              href={getLocalizedPath('/services')}
              className="inline-flex items-center justify-center w-full sm:w-auto min-w-[160px] text-lg font-medium text-white border-2 border-white/20 bg-white/5 backdrop-blur-sm py-3.5 px-6 rounded transition-all hover:bg-white/10 hover:border-white/40"
            >
              {t('hero.servicesButton', 'Discover Services')}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
