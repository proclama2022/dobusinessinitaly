import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

type StatItemProps = {
  value: number;
  suffix: string;
  title: string;
  description: string;
};

const StatItem = ({ value, suffix, title, description }: StatItemProps) => {
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
    <div className="bg-neutral-100 p-6 rounded-lg text-center transition-transform hover:scale-105">
      <div className="text-primary text-4xl font-bold mb-2">
        <span ref={countRef}>{count}</span>{suffix}
      </div>
      <h3 className="text-lg font-heading font-medium text-neutral-700">{title}</h3>
      <p className="text-neutral-600 text-sm mt-2">{description}</p>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: 150,
      suffix: '+',
      title: t('stats.clients.title'),
      description: t('stats.clients.description')
    },
    {
      value: 25,
      suffix: '+',
      title: t('stats.experience.title'),
      description: t('stats.experience.description')
    },
    {
      value: 12,
      suffix: '+',
      title: t('stats.professionals.title'),
      description: t('stats.professionals.description')
    },
    {
      value: 20,
      suffix: 'M+',
      title: t('stats.volume.title'),
      description: t('stats.volume.description')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold text-neutral-800 mb-4">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
