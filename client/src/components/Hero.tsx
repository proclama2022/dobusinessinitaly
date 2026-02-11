import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useState, useRef } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { useLocalizedPath } from './LocalizedRouter';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const heroTitle = t('hero.title') || 'Accounting Expertise For Your Global Business';
  const heroSubtitle = t('hero.subtitle') || 'We assist foreign companies and investors in successfully managing their business in Italy.';

  useEffect(() => {
    setIsLoaded(true);

    // GSAP Animation for title
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.title-word');
      gsap.fromTo(
        words,
        { y: 80, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }

    // Custom cursor (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && window.matchMedia('(hover: hover)').matches) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split title into words for animation
  const titleWords = heroTitle.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-navy cursor-custom"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="cursor-dot hidden md:block"
        style={{ left: 0, top: 0 }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/heronew.png"
          alt="Business in Italy"
          className="w-full h-full object-cover opacity-90"
          priority={true}
          width={1920}
          height={1080}
          style={{ objectPosition: 'center right' }}
        />
      </div>

      {/* Asymmetric Gradient Overlay - Stronger on left */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy via-navy/[0.85] to-navy/[0.1]" />

      {/* Mesh Gradient for depth */}
      <div className="absolute inset-0 z-[2] mesh-gradient-dark opacity-50" />

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[3] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Decorative Elements - Asymmetric */}
      <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-italian-green/10 blur-3xl z-[2]" />
      <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-gold/5 blur-2xl z-[2]" />

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-[10] py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

          {/* Text Content - Shifted Left */}
          <div className="lg:col-span-8 flex flex-col justify-center lg:pr-12">

            {/* Premium Badge - Shifted */}
            <div
              className={cn(
                "inline-flex items-center gap-3 mb-10 opacity-0 layout-shift-left",
                isLoaded && "animate-italian-fade-in-scale opacity-100"
              )}
            >
              <span className="w-12 h-px bg-gold" />
              <span className="text-gold font-accent text-xs font-semibold uppercase tracking-[0.25em]">
                Excellence in Italy
              </span>
            </div>

            {/* Main Title - Character Animation */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-8 font-display tracking-tight perspective-1000"
              style={{ perspective: '1000px' }}
            >
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={cn(
                    "title-word inline-block mr-[0.25em]",
                    i === 1 && "italic text-gold"
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle - Narrower width for elegance */}
            <p
              className={cn(
                "text-lg lg:text-xl text-white/75 mb-12 max-w-lg leading-relaxed font-body font-light opacity-0",
                isLoaded && "animate-italian-fade-in-up opacity-100"
              )}
              style={{ animationDelay: '0.5s' }}
            >
              {heroSubtitle}
            </p>

            {/* Buttons - Asymmetric alignment */}
            <div
              className={cn(
                "flex flex-wrap gap-5 opacity-0",
                isLoaded && "animate-italian-fade-in-up opacity-100"
              )}
              style={{ animationDelay: '0.7s' }}
            >
              <Link href={getLocalizedPath('/contact')}>
                <button className="btn-luxury-primary group flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider">
                  {t('hero.contactButton', 'Start Now')}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>

              <Link href={getLocalizedPath('/services')}>
                <button className="btn-luxury-outline border-white/30 text-white hover:text-navy px-8 py-4 text-sm font-bold uppercase tracking-wider">
                  {t('hero.servicesButton', 'Our Services')}
                </button>
              </Link>
            </div>

            {/* Trust Indicators - Redesigned */}
            <div
              className={cn(
                "mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center gap-8 lg:gap-12 opacity-0",
                isLoaded && "animate-italian-fade-in-up opacity-100"
              )}
              style={{ animationDelay: '0.9s' }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl font-display text-white font-bold">500+</span>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <span className="text-white/90 text-sm font-medium block">Clienti</span>
                  <span className="text-white/50 text-xs">in Italia</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex text-gold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-medium">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right Side - Floating Cards (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-4 relative h-[500px]">
            {/* Card 1 - Floating above */}
            <div
              className={cn(
                "absolute top-8 right-0 w-72 glass-card p-6 rounded-lg opacity-0 rotate-2",
                isLoaded && "animate-italian-sweep-in opacity-100"
              )}
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-italian-green rounded-lg flex items-center justify-center text-white font-bold">
                  IT
                </div>
                <div>
                  <h4 className="text-white font-headline font-bold text-sm">Proclama STP</h4>
                  <p className="text-white/60 text-xs">Official Partner</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 bg-white/20 rounded-full w-4/5" />
                <div className="h-1.5 bg-white/10 rounded-full w-full" />
                <div className="h-1.5 bg-white/10 rounded-full w-3/4" />
              </div>
            </div>

            {/* Card 2 - Below and rotated */}
            <div
              className={cn(
                "absolute top-[180px] right-12 w-64 bg-cream/95 p-5 rounded-lg shadow-xl opacity-0 -rotate-3",
                isLoaded && "animate-italian-sweep-in opacity-100"
              )}
              style={{ animationDelay: '1.2s' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-navy/60 text-xs uppercase tracking-wider">Services</span>
                <span className="w-2 h-2 bg-italian-green rounded-full animate-pulse" />
              </div>
              <div className="space-y-2 text-sm text-navy/80">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-italian-green rounded-full" />
                  <span>Company Formation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-italian-green rounded-full" />
                  <span>Tax & Accounting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-italian-green rounded-full" />
                  <span>Visa & Relocation</span>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div
              className={cn(
                "absolute top-[350px] right-24 w-32 h-px bg-gradient-to-r from-gold to-transparent opacity-0",
                isLoaded && "animate-italian-fade-in opacity-100"
              )}
              style={{ animationDelay: '1.4s' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
