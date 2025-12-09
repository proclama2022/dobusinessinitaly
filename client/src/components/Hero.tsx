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

  // Safe defaults
  const defaultTitle = 'Accounting Expertise For Your Global Business';
  const defaultSubtitle =
    'We assist foreign companies and investors in successfully managing their business in Italy, providing excellence in tax and commercial consulting.';

  const heroTitle = t('hero.title') || defaultTitle;
  const heroSubtitle = t('hero.subtitle') || defaultSubtitle;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[75vh] flex items-center overflow-hidden bg-navy">
      {/* 1. Background Image Layer - Deepest */}
      <div className="absolute inset-0 z-0">
      <OptimizedImage
        src="/images/heronew.png"
        alt="Commercialista per stranieri in Italia"
          className="w-full h-full object-cover"
        priority={true}
        width={1920}
        height={1080}
        />
      </div>

      {/* 2. Gradient Overlay Layer - Provides Contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-italian-green/95 via-italian-green/90 to-navy/80 mix-blend-multiply"></div>
      
      {/* 3. Texture/Noise Overlay (Optional Modern Touch) */}
      <div className="absolute inset-0 z-[2] opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 h-full relative z-[10] flex items-center py-20">
        <div className="max-w-4xl w-full">
          
          {/* Badge */}
          <div className={cn(
            "inline-block mb-6 transition-all duration-700 delay-100",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}>
            <span className="py-2 px-4 border border-white/30 text-white font-[Montserrat] text-xs uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md rounded-full">
              Your Business in Italy
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 transition-all duration-700 ease-out tracking-tight drop-shadow-sm",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className={cn(
            "text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ease-out border-l-2 border-italian-red pl-6",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            {heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center sm:items-start gap-4 transition-all duration-700 delay-300 ease-out",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}>
            <Link href={getLocalizedPath('/contact')}>
              <button className="bg-white text-italian-green hover:text-italian-green-dark font-bold text-base py-4 px-10 rounded-sm hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto min-w-[200px]">
                {t('hero.contactButton', 'Contact Us')}
              </button>
            </Link>
            
            <Link href={getLocalizedPath('/services')}>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-italian-green font-bold text-base py-4 px-10 rounded-sm transition-all hover:-translate-y-1 w-full sm:w-auto backdrop-blur-sm min-w-[200px]">
                {t('hero.servicesButton', 'Discover Services')}
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full z-[20] overflow-hidden leading-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white"></path>
        </svg>
      </div>

      {/* Italian Flag Accent at very bottom right */}
      <div className="absolute bottom-0 right-0 w-1/3 h-2 flex z-[21]">
        <div className="w-full h-full bg-gradient-to-r from-italian-green via-white to-italian-red"></div>
      </div>
    </section>
  );
};

export default Hero;
