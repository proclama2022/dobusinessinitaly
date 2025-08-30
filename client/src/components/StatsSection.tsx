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
    <div className="card p-6 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
        <i className={`${icon} text-primary text-2xl`}></i>
      </div>
      <div className="text-4xl font-bold text-neutral-900 mb-1">
        <span ref={countRef}>{count}</span>{suffix}
      </div>
      <h3 className="text-lg font-[Montserrat] font-semibold text-neutral-900">{title}</h3>
      <p className="text-neutral-600 text-sm mt-1">{description}</p>
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
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="section-title mb-4">
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
