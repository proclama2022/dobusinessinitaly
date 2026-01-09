import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useLocalizedPath } from './LocalizedRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding,
  faCalculator,
  faPassport,
  faUserTie,
  faArrowRight,
  faLandmark
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

type BentoCardProps = {
  icon: IconDefinition;
  title: string;
  description: string;
  linkTo: string;
  className?: string;
  variant?: 'default' | 'dark' | 'light' | 'image';
  bgImage?: string;
};

const BentoCard = ({ icon, title, description, linkTo, className, variant = 'default', bgImage }: BentoCardProps) => {
  const { getLocalizedPath } = useLocalizedPath();
  
  const bgClasses = {
    default: 'bg-white border-neutral-100 hover:border-gold/50',
    dark: 'bg-navy text-white border-navy',
    light: 'bg-cream border-cream hover:border-gold/50',
    image: 'text-white border-none'
  };

  const textClasses = {
    default: 'text-gray-600',
    dark: 'text-gray-300',
    light: 'text-gray-700',
    image: 'text-gray-100'
  };

  const titleClasses = {
    default: 'text-navy',
    dark: 'text-white',
    light: 'text-navy',
    image: 'text-white'
  };

  return (
    <div className={cn(
      "group relative p-8 transition-all duration-500 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-2xl border",
      bgClasses[variant],
      className
    )}>
      {/* Image Background for 'image' variant */}
      {variant === 'image' && bgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img src={bgImage} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy/90 via-navy/60 to-transparent"></div>
        </>
      )}

      {/* Hover Gradient Overlay for non-image variants */}
      {variant !== 'image' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-transparent to-black/5 transition-opacity duration-500 pointer-events-none"></div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className={cn(
          "w-12 h-12 mb-6 flex items-center justify-center rounded-lg text-xl transition-all duration-300",
          variant === 'dark' || variant === 'image' ? 'bg-white/10 text-gold backdrop-blur-md' : 'bg-navy/5 text-italian-green'
        )}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <h3 className={cn("text-2xl font-bold mb-3 font-instrument", titleClasses[variant])}>
          {title}
        </h3>

        <p className={cn("mb-8 leading-relaxed flex-grow font-light", textClasses[variant])}>
          {description}
        </p>

        <div className="mt-auto">
          <Link href={getLocalizedPath(linkTo)}>
            <span className={cn(
              "inline-flex items-center text-sm font-bold uppercase tracking-widest transition-all group-hover:translate-x-2",
              variant === 'dark' || variant === 'image' ? 'text-white hover:text-gold' : 'text-italian-green hover:text-italian-green-dark'
            )}>
              Discover More
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
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Tailored Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-navy font-instrument leading-tight">
              Comprehensive Services for <br/>
              <span className="text-italian-green italic">Global Business</span>
            </h2>
          </div>
          <div className="mb-2">
            <Link href={getLocalizedPath('/services')}>
              <button className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-navy text-navy font-bold text-sm uppercase tracking-wider hover:bg-navy hover:text-white transition-all rounded-sm">
                View All Services
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* 1. Main Feature - Company Formation (Span 2 cols, 2 rows) */}
          <BentoCard
            icon={faBuilding}
            title={t('services.items.formation.title')}
            description={t('services.items.formation.description')}
            linkTo="/services/open-company-italy"
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            variant="image"
            bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          />

          {/* 2. Tax & Accounting (Dark variant) */}
          <BentoCard
            icon={faCalculator}
            title={t('services.items.accounting.title')}
            description={t('services.items.accounting.description')}
            linkTo="/services/tax-accounting-expats"
            className="md:col-span-1 md:row-span-1"
            variant="dark"
          />

          {/* 3. Relocation (Cream variant) */}
          <BentoCard
            icon={faPassport}
            title={t('services.items.relocation.title')}
            description={t('services.items.relocation.description')}
            linkTo="/services"
            className="md:col-span-1 md:row-span-1"
            variant="light"
          />

          {/* 4. Freelancer (Default variant) */}
          <BentoCard
            icon={faUserTie}
            title={t('services.items.freelancer.title')}
            description={t('services.items.freelancer.description')}
            linkTo="/services"
            className="md:col-span-1 md:row-span-1"
            variant="default"
          />

          {/* 5. Special Tax Regimes (Dark Green / Image) */}
          <BentoCard
            icon={faLandmark}
            title={t('services.items.regime_forfettario.title')}
            description="Access the 5% flat tax regime and optimize your fiscal position in Italy."
            linkTo="/services"
            className="md:col-span-2 md:row-span-1 bg-italian-green text-white border-none"
            variant="dark"
          />

        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link href={getLocalizedPath('/services')}>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-bold text-sm uppercase tracking-wider hover:bg-italian-green transition-all rounded-sm shadow-lg">
              View All Services
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
