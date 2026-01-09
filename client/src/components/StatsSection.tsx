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
  icon: any;
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
    <div className="group p-8 text-center bg-white rounded-sm border border-gray-100 hover:border-italian-green/30 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-italian-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-italian-green text-italian-green group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
        <FontAwesomeIcon icon={icon} className="text-2xl transition-colors duration-300" />
      </div>
      
      <div className="text-4xl md:text-5xl font-bold text-navy mb-2 tracking-tight font-instrument">
        <span ref={countRef}>{count}</span><span className="text-italian-green text-3xl align-top ml-1">{suffix}</span>
      </div>
      
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pb-4 border-b border-gray-100 group-hover:border-italian-green/20 transition-colors">{title}</h3>
      
      <p className="text-gray-600 text-sm leading-relaxed font-outfit">{description}</p>
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
      suffix: 'M',
      title: t('stats.volume.title'),
      description: t('stats.volume.description'),
      icon: faEuroSign
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className={cn("text-center mb-16 transition-all duration-700", isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <span className="text-italian-green font-bold tracking-widest text-xs uppercase mb-3 block">Trusted by Leaders</span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-instrument">
            {t('stats.title')}
          </h2>
          <div className="w-24 h-1 bg-italian-green mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto italic font-outfit">
            "{t('stats.subtitle')}"
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
