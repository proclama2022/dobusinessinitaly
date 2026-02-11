import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeEurope,
  faCalendarCheck,
  faUserTie,
  faEuroSign,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StatItemProps = {
  value: number;
  suffix: string;
  title: string;
  description: string;
  icon: any;
  index: number;
  variant: 'default' | 'accent' | 'minimal';
};

const StatItem = ({ value, suffix, title, description, icon, index, variant }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Animate count when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue(0, value, 2000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(easeProgress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Different border-radius for each card
  const radiusVariants = [
    'rounded-tl-3xl rounded-br-2xl',
    'rounded-tr-2xl rounded-bl-3xl',
    'rounded-tl-2xl rounded-br-3xl',
    'rounded-tr-3xl rounded-bl-2xl'
  ];

  const bgVariants = {
    default: 'bg-white border-neutral-100',
    accent: 'bg-navy text-white border-navy',
    minimal: 'bg-transparent border-transparent'
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group p-8 lg:p-10 transition-all duration-500 border reveal-up",
        "hover:shadow-xl",
        bgVariants[variant],
        radiusVariants[index % 4]
      )}
    >
      {/* Icon - different position per card */}
      <div
        className={cn(
          "w-14 h-14 flex items-center justify-center text-xl mb-6 transition-all duration-300",
          variant === 'accent'
            ? 'bg-white/10 text-gold rounded-xl'
            : 'bg-neutral-50 text-italian-green rounded-2xl group-hover:bg-italian-green group-hover:text-white'
        )}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Number */}
      <div
        ref={countRef}
        className={cn(
          "text-5xl lg:text-6xl font-bold tracking-tight font-display mb-2",
          variant === 'accent' ? 'text-white' : 'text-navy'
        )}
      >
        {count}
        <span
          className={cn(
            "text-3xl align-top ml-1",
            variant === 'accent' ? 'text-gold' : 'text-italian-green'
          )}
        >
          {suffix}
        </span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "text-xs font-bold uppercase tracking-widest mb-4 pb-4 border-b",
          variant === 'accent'
            ? 'text-white/60 border-white/20'
            : 'text-neutral-400 border-neutral-100'
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-sm leading-relaxed font-body",
          variant === 'accent' ? 'text-white/70' : 'text-neutral-600'
        )}
      >
        {description}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Quote parallax
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Cards reveal
    const cards = sectionRef.current.querySelectorAll('.reveal-up');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const stats = [
    {
      value: 500,
      suffix: '+',
      title: t('stats.clients.title'),
      description: t('stats.clients.description'),
      icon: faGlobeEurope,
      variant: 'default' as const
    },
    {
      value: 25,
      suffix: '+',
      title: t('stats.experience.title'),
      description: t('stats.experience.description'),
      icon: faCalendarCheck,
      variant: 'accent' as const
    },
    {
      value: 12,
      suffix: '+',
      title: t('stats.professionals.title'),
      description: t('stats.professionals.description'),
      icon: faUserTie,
      variant: 'default' as const
    },
    {
      value: 50,
      suffix: 'M',
      title: t('stats.volume.title'),
      description: t('stats.volume.description'),
      icon: faEuroSign,
      variant: 'default' as const
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background - NOT flat! */}
      <div className="absolute inset-0 bg-neutral-50" />
      <div className="absolute inset-0 mesh-gradient-italian opacity-30" />

      {/* Decorative quote - Floating */}
      <div
        ref={quoteRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-5 z-0"
      >
        <FontAwesomeIcon icon={faQuoteLeft} className="text-[200px] lg:text-[300px] text-navy" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-32 w-48 h-48 border border-italian-green/10 rounded-full" />
      <div className="absolute bottom-24 left-16 w-32 h-32 border border-gold/20 rounded-full" />
      <div className="absolute top-40 left-1/4 w-4 h-4 bg-italian-green/20 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - NOT centered */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-italian-green" />
            <span className="text-italian-green font-bold tracking-[0.2em] text-xs uppercase">
              Trusted by Leaders
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-navy font-display leading-tight mb-6">
            {t('stats.title').split(' ').map((word, i, arr) => (
              <span key={i}>
                {word}{' '}
                {i === arr.length - 1 && (
                  <span className="italic text-italian-green">Excellence</span>
                )}
              </span>
            ))}
          </h2>

          <p className="text-lg text-navy/60 font-body italic max-w-lg">
            "{t('stats.subtitle')}"
          </p>
        </div>

        {/* Stats Grid - BROKEN, not 4-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Stat 1 - Normal */}
          <StatItem {...stats[0]} index={0} />

          {/* Stat 2 - Accent card, shifted down */}
          <div className="lg:mt-12">
            <StatItem {...stats[1]} index={1} />
          </div>

          {/* Stat 3 - Normal, shifted up */}
          <div className="lg:-mt-6">
            <StatItem {...stats[2]} index={2} />
          </div>

          {/* Stat 4 - Normal */}
          <StatItem {...stats[3]} index={3} />

        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
          <div className="w-2 h-2 bg-gold rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
