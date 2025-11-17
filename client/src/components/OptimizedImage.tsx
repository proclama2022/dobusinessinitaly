import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

/**
 * Componente ottimizzato per immagini con lazy loading e performance
 * Implementa best practices SEO 2025 per immagini
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes,
  srcSet,
  onLoad,
  onError,
  style
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer per lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Carica 50px prima che l'immagine entri nel viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder shimmer mentre carica
  if (!isInView && !priority) {
    return (
      <div
        ref={imgRef}
        className={`image-placeholder ${className}`}
        style={{ width, height, ...style }}
        role="img"
        aria-label={alt}
      />
    );
  }

  // Immagine di errore
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={{ width, height, ...style }}
        role="img"
        aria-label={`Errore caricamento immagine: ${alt}`}
      >
        <i className="fas fa-image" aria-hidden="true"></i>
        <span className="sr-only">Immagine non disponibile</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={`${className} ${isLoaded ? 'lazy-loaded' : ''}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      // SEO ottimizzazioni
      // React non riconosce fetchPriority in camelCase: usare attributo custom lowercase
      // @ts-ignore
      fetchpriority={priority ? 'high' : 'auto'}
      // Accessibilità
      role="img"
      // Performance
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined,
        ...style
      }}
    />
  );
};

export default OptimizedImage;
