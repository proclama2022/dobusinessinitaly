import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeEurope,
  faCalendarCheck,
  faUserTie,
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

type StatItemProps = {
  value: number;
  suffix: string;
  title: string;
  description: string;
  index: number;
  icon: any; // Icona FontAwesome
};

const StatItem = ({ value, suffix, title, description, index, icon }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue(0, value, 2000);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, hasAnimated]);

  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <div className="group relative p-8 text-center bg-white border border-neutral-100 rounded shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500">
      
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
        <FontAwesomeIcon icon={icon} className="text-primary text-2xl group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        <span ref={countRef}>{count}</span>{suffix}
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 uppercase tracking-wide mb-3">{title}</h3>
      
      <div className="w-12 h-px bg-neutral-200 mx-auto mb-4 group-hover:bg-primary/50 transition-colors duration-500"></div>
      
      <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      value: 500,
      suffix: '+',
      title: t('stats.clients.title'),
      description: t('stats.clients.description'),
      icon: faGlobeEurope
    },
    {
      value: 25,
      suffix: '+',
      title: t('stats.experience.title'),
      description: t('stats.experience.description'),
      icon: faCalendarCheck
    },
    {
      value: 12,
      suffix: '+',
      title: t('stats.professionals.title'),
      description: t('stats.professionals.description'),
      icon: faUserTie
    },
    {
      value: 50,
      suffix: 'M+',
      title: t('stats.volume.title'),
      description: t('stats.volume.description'),
      icon: faEuroSign
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn("text-center mb-16 transition-all duration-700", isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-2 block">Trusted by Leaders</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            {t('stats.title')}
          </h2>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
              index={index}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
