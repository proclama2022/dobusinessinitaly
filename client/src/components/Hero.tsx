import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from './LocalizedRouter';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle, faBriefcase, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [isLoaded, setIsLoaded] = useState(false);

  const heroTitle = t('hero.title') || 'Accounting Expertise For Your Global Business';
  const heroSubtitle = t('hero.subtitle') || 'We assist foreign companies and investors in successfully managing their business in Italy.';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy">

      {/* 1. Background Image - Bright and High Quality */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/heronew.png"
          alt="Business in Italy"
          className="w-full h-full object-cover opacity-90"
          priority={true}
          width={1920}
          height={1080}
          style={{ objectPosition: 'center right' }} // Focus on the visual part
        />
      </div>

      {/* 2. Modern Gradient Overlay - Left to Right Fade */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy via-navy/95 to-navy/20 sm:to-transparent"></div>

      {/* 3. Subtle Texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-[10] py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Premium Badge */}
            <div className={cn(
              "inline-flex items-center gap-2 mb-8 opacity-0",
              isLoaded && "animate-italian-fade-in-scale opacity-100"
            )}>
              <span className="h-px w-8 bg-gold"></span>
              <span className="text-gold font-outfit text-xs font-bold uppercase tracking-[0.2em]">
                Excellence in Italy
              </span>
            </div>

            {/* Main Title */}
            <h1 className={cn(
              "text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 font-instrument tracking-tight opacity-0",
              isLoaded && "animate-italian-slide-in-down opacity-100"
            )}>
              {heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic text-white" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className={cn(
              "text-lg text-white/80 mb-10 max-w-xl leading-relaxed font-light opacity-0",
              isLoaded && "animate-italian-fade-in-up opacity-100"
            )} style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>

            {/* Buttons */}
            <div className={cn(
              "flex flex-wrap gap-4 opacity-0",
              isLoaded && "animate-italian-fade-in-up opacity-100"
            )} style={{ animationDelay: '0.4s' }}>
              <Link href={getLocalizedPath('/contact')}>
                <button className="italian-button bg-italian-green text-white font-bold text-xs py-4 px-8 rounded-sm hover:translate-y-[-2px] transition-all shadow-lg hover:shadow-italian-green/20 flex items-center gap-2 group">
                  {t('hero.contactButton', 'Start Now')}
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href={getLocalizedPath('/services')}>
                <button className="italian-button bg-white/5 border border-white/20 text-white hover:bg-white hover:text-navy font-bold text-xs py-4 px-8 rounded-sm transition-all backdrop-blur-sm hover:translate-y-[-2px]">
                  {t('hero.servicesButton', 'Our Services')}
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className={cn(
              "mt-12 pt-8 border-t border-white/10 flex gap-8", // Removed opacity-0 and animate-italian-reveal from parent
              isLoaded && "opacity-100" // Only apply opacity if loaded
            )}>
              <div className={cn(
                "flex items-center gap-6 opacity-0",
                isLoaded && "animate-italian-fade-in-up opacity-100"
              )} style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-navy bg-navy-light flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover opacity-80" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-white block font-medium">500+ Clienti</span>
                    <span className="text-white/60 text-xs">Soddisfatti in Italia</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="flex text-venetian-gold text-xs">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>
                  <span className="text-white font-medium text-sm">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element (Right - Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            {/* Floating Glass Card */}
            <div className={cn(
              "absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-lg shadow-2xl max-w-sm opacity-0",
              isLoaded && "animate-italian-sweep-in opacity-100"
            )} style={{ animationDelay: '0.8s' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-italian-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  IT
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Proclama STP</h3>
                  <p className="text-neutral-300 text-sm">Official Partner</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                <div className="h-2 bg-white/10 rounded-full w-full"></div>
                <div className="h-2 bg-white/10 rounded-full w-5/6"></div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-gold font-bold text-xl">4.9/5</span>
                <div className="flex text-gold text-xs gap-1">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>★</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

