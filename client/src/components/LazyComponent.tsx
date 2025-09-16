import { lazy, Suspense, ComponentType } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyComponentProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

// Componente di loading ottimizzato per mobile
const LoadingFallback = ({ className }: { className?: string }) => (
  <div className={`animate-pulse ${className || ''}`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 w-full"></div>
  </div>
);

// Hook per creare componenti lazy con fallback ottimizzato
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallbackClassName?: string
) => {
  const LazyComp = lazy(importFn);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<LoadingFallback className={fallbackClassName} />}>
      <LazyComp {...props} />
    </Suspense>
  );
};

// Componente wrapper per lazy loading con Intersection Observer
export const LazySection = ({ 
  children, 
  fallback, 
  className = "" 
}: LazyComponentProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  return (
    <div ref={targetRef} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback || <LoadingFallback className={className} />}>
          {children}
        </Suspense>
      ) : (
        <div className={`${className} bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg`}>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      )}
    </div>
  );
};

export default LazySection;