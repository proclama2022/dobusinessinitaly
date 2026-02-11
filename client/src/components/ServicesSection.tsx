import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useEffect, useRef } from 'react';
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faCalculator,
  faPassport,
  faUserTie,
  faArrowRight,
  faLandmark,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ServiceCardProps = {
  icon: any;
  title: string;
  description: string;
  linkTo: string;
  size: 'hero' | 'medium' | 'small';
  variant: 'dark' | 'cream' | 'white' | 'green' | 'image';
  bgImage?: string;
  index: number;
  className?: string;
};

const ServiceCard = ({
  icon,
  title,
  description,
  linkTo,
  size,
  variant,
  bgImage,
  index,
  className
}: ServiceCardProps) => {
  const { getLocalizedPath } = useLocalizedPath();
  const cardRef = useRef<HTMLDivElement>(null);

  // Variant styles
  const variantStyles = {
    dark: 'bg-navy text-white border-navy',
    cream: 'bg-cream text-navy border-cream/50',
    white: 'bg-white text-navy border-neutral-100',
    green: 'bg-italian-green text-white border-italian-green',
    image: 'text-white border-none'
  };

  // Size styles - asymmetric!
  const sizeStyles = {
    hero: 'md:col-span-2 md:row-span-2 min-h-[480px] lg:min-h-[520px]',
    medium: 'md:col-span-1 md:row-span-1 min-h-[240px]',
    small: 'md:col-span-1 md:row-span-1 min-h-[200px]'
  };

  // Border radius - NOT uniform!
  const radiusStyles = {
    hero: 'rounded-none md:rounded-tl-2xl md:rounded-br-2xl',
    medium: 'rounded-tl-xl rounded-br-3xl',
    small: 'rounded-tr-2xl rounded-bl-xl'
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative p-8 lg:p-10 transition-all duration-500 overflow-hidden flex flex-col border reveal-up",
        "hover:shadow-2xl hover-lift-dramatic",
        variantStyles[variant],
        sizeStyles[size],
        radiusStyles[size],
        className
      )}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Image Background */}
      {variant === 'image' && bgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={bgImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/95 via-navy/70 to-navy/30" />
        </>
      )}

      {/* Decorative corner accent */}
      {(variant === 'cream' || variant === 'white') && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-italian-green/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 mb-6 flex items-center justify-center text-xl transition-all duration-300",
            variant === 'dark' || variant === 'green' || variant === 'image'
              ? 'bg-white/10 text-gold backdrop-blur-sm rounded-xl'
              : 'bg-navy/5 text-italian-green rounded-2xl group-hover:bg-italian-green group-hover:text-white'
          )}
        >
          <FontAwesomeIcon icon={icon} />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-2xl lg:text-3xl font-bold mb-4 font-display leading-tight",
            variant === 'dark' || variant === 'green' || variant === 'image'
              ? 'text-white'
              : 'text-navy'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "mb-8 leading-relaxed flex-grow font-body",
            size === 'small' ? 'text-sm line-clamp-2' : '',
            variant === 'dark' || variant === 'green' || variant === 'image'
              ? 'text-white/70'
              : 'text-navy/60'
          )}
        >
          {description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <Link href={getLocalizedPath(linkTo)}>
            <span
              className={cn(
                "inline-flex items-center text-sm font-bold uppercase tracking-widest transition-all group-hover:translate-x-2",
                variant === 'dark' || variant === 'green' || variant === 'image'
                  ? 'text-white hover:text-gold'
                  : 'text-italian-green hover:text-italian-green-dark'
              )}
            >
              Discover
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.querySelectorAll('.animate-word'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Cards staggered reveal
    const cards = sectionRef.current.querySelectorAll('.reveal-up');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.08
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    {
      icon: faBuilding,
      title: t('services.items.formation.title'),
      description: t('services.items.formation.description'),
      linkTo: '/services/open-company-italy',
      size: 'hero' as const,
      variant: 'image' as const,
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600'
    },
    {
      icon: faCalculator,
      title: t('services.items.accounting.title'),
      description: t('services.items.accounting.description'),
      linkTo: '/services/tax-accounting-expats',
      size: 'medium' as const,
      variant: 'dark' as const
    },
    {
      icon: faGlobe,
      title: 'International Tax',
      description: 'Strategic tax planning for cross-border operations.',
      linkTo: '/services',
      size: 'small' as const,
      variant: 'cream' as const
    },
    {
      icon: faPassport,
      title: t('services.items.relocation.title'),
      description: t('services.items.relocation.description'),
      linkTo: '/services',
      size: 'medium' as const,
      variant: 'white' as const
    },
    {
      icon: faUserTie,
      title: t('services.items.freelancer.title'),
      description: t('services.items.freelancer.description'),
      linkTo: '/services',
      size: 'small' as const,
      variant: 'green' as const
    },
    {
      icon: faLandmark,
      title: t('services.items.regime_forfettario.title'),
      description: 'Access the 5% flat tax regime and optimize your fiscal position.',
      linkTo: '/services',
      size: 'medium' as const,
      variant: 'cream' as const
    }
  ];

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      {/* Background - Mesh gradient instead of flat */}
      <div className="absolute inset-0 mesh-gradient-italian" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-italian-green/10 rounded-full opacity-50" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gold/5 rounded-full blur-xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Asymmetric */}
        <div ref={titleRef} className="mb-16 lg:mb-24 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold font-accent text-xs font-semibold uppercase tracking-[0.25em]">
              Tailored Solutions
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-display leading-[1.1] mb-6">
            <span className="animate-word inline-block">Comprehensive</span>{' '}
            <span className="animate-word inline-block">Services</span>{' '}
            <span className="animate-word inline-block italic text-italian-green">for Global</span>{' '}
            <span className="animate-word inline-block italic text-italian-green">Business</span>
          </h2>

          <p className="text-lg text-navy/60 font-body max-w-xl">
            End-to-end support for your business journey in Italy, from company formation to ongoing compliance.
          </p>
        </div>

        {/* Broken Grid Layout - NOT 3-column! */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(200px,auto)]">

          {/* Card 1 - HERO (2 cols, 2 rows) */}
          <ServiceCard {...services[0]} index={0} />

          {/* Card 2 - MEDIUM (1 col, 1 row) - Overlaps hero on mobile */}
          <ServiceCard
            {...services[1]}
            index={1}
            className="md:-mt-8 md:ml-4"
          />

          {/* Card 3 - SMALL */}
          <ServiceCard {...services[2]} index={2} />

          {/* Card 4 - MEDIUM - Shifted */}
          <ServiceCard
            {...services[3]}
            index={3}
            className="md:mt-8 md:-ml-4"
          />

          {/* Card 5 - SMALL */}
          <ServiceCard {...services[4]} index={4} />

          {/* Card 6 - MEDIUM - Full width on mobile */}
          <ServiceCard
            {...services[5]}
            index={5}
            className="md:col-span-1"
          />

        </div>

        {/* Bottom CTA - Asymmetric */}
        <div className="mt-16 lg:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-12 border-t border-navy/10">
          <div className="max-w-md">
            <h3 className="text-xl font-headline font-bold text-navy mb-2">
              Not sure where to start?
            </h3>
            <p className="text-navy/60 font-body">
              Book a free consultation and we'll guide you through the process.
            </p>
          </div>

          <Link href="/contact">
            <button className="btn-luxury-outline border-navy text-navy hover:text-white flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider">
              Book Consultation
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
