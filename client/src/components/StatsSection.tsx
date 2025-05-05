import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

type StatItemProps = {
  value: number;
  suffix: string;
  title: string;
  description: string;
  index: number;
  icon: string;
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

  // Colore in base all'indice, alternando i colori della bandiera italiana
  const getBackgroundColor = () => {
    if (index % 3 === 0) return 'from-[#009246]/10 to-[#009246]/5'; // Verde
    if (index % 3 === 1) return 'from-neutral-100 to-white'; // Bianco
    return 'from-[#ce2b37]/10 to-[#ce2b37]/5'; // Rosso
  };

  return (
    <div 
      className={`bg-gradient-to-br ${getBackgroundColor()} p-6 rounded-lg text-center shadow-md animate-float`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full relative">
        <div className="absolute inset-0 italian-gradient rounded-full opacity-80"></div>
        <div className="absolute inset-0 rounded-full bg-white/40 flex items-center justify-center">
          <i className={`${icon} text-[#222] text-2xl drop-shadow-sm`}></i>
        </div>
      </div>
      <div className="italian-text-gradient text-4xl font-bold mb-2">
        <span ref={countRef}>{count}</span>{suffix}
      </div>
      <h3 className="text-lg font-heading font-medium text-neutral-800">{title}</h3>
      <p className="text-neutral-600 text-sm mt-2">{description}</p>
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
      value: 150,
      suffix: '+',
      title: t('stats.clients.title'),
      description: t('stats.clients.description'),
      icon: 'fas fa-globe-europe'
    },
    {
      value: 25,
      suffix: '+',
      title: t('stats.experience.title'),
      description: t('stats.experience.description'),
      icon: 'fas fa-calendar-check'
    },
    {
      value: 12,
      suffix: '+',
      title: t('stats.professionals.title'),
      description: t('stats.professionals.description'),
      icon: 'fas fa-user-tie'
    },
    {
      value: 50,
      suffix: 'M+',
      title: t('stats.volume.title'),
      description: t('stats.volume.description'),
      icon: 'fas fa-euro-sign'
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Linee decorative tricolore italiano */}
      <div className="absolute inset-x-0 top-0 h-1 italian-gradient opacity-90"></div>
      <div className="absolute inset-x-0 bottom-0 h-1 italian-gradient opacity-90"></div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="italian-text-gradient text-3xl font-heading font-semibold mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
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
