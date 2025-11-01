import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'skeleton' | 'color';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  lazyLoadMethod?: 'native' | 'intersection' | 'both';
}

/**
 * Componente immagine ottimizzato per mobile con:
 * - Supporto AVIF/WebP con fallback automatico
 * - Lazy loading avanzato con Intersection Observer
 * - Placeholder blur per migliorare la percezione di velocità
 * - Srcset responsive ottimizzato per tutti i dispositivi
 * - Skeleton loaders e animazioni progressive
 * - Compressione automatica per Unsplash e immagini locali
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 85,
  onLoad,
  onError,
  objectFit = 'cover',
  aspectRatio,
  lazyLoadMethod = 'both'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const pictureRef = useRef<HTMLPictureElement>(null);

  // Genera URL ottimizzati per diversi formati e dimensioni
  const generateOptimizedUrls = useCallback((originalSrc: string, targetWidth?: number) => {
    // Gestione immagini Unsplash
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();

      if (targetWidth) params.set('w', targetWidth.toString());
      params.set('q', quality.toString());
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('crop', 'entropy');

      return {
        avif: `${baseUrl}?${params.toString()}&fm=avif`,
        webp: `${baseUrl}?${params.toString()}&fm=webp`,
        jpeg: `${baseUrl}?${params.toString()}&fm=jpg`
      };
    }

    // Gestione immagini locali - cerca formati ottimizzati
    const baseUrl = originalSrc.replace(/\.(png|jpe?g)$/i, '');
    return {
      avif: `${baseUrl}.avif`,
      webp: `${baseUrl}.webp`,
      jpeg: originalSrc
    };
  }, [quality]);

  // Genera srcset responsive per mobile/tablet/desktop (ridotto per performance)
  const generateResponsiveSrcSet = useCallback((src: string, format: 'avif' | 'webp' | 'jpeg') => {
    if (!src.includes('unsplash.com')) {
      // Per immagini locali, usa il formato ottimizzato
      if (format === 'jpeg') {
        return src;
      }
      const baseUrl = src.replace(/\.(png|jpe?g)$/i, '');
      return `${baseUrl}.${format}`;
    }

    // Dimensioni ottimizzate ridotte per LCP performance (solo breakpoint essenziali)
    const breakpoints = priority
      ? [
          { width: 640, descriptor: '640w' },   // Mobile
          { width: 1024, descriptor: '1024w' }, // Tablet
          { width: 1920, descriptor: '1920w' }  // Desktop
        ]
      : [
          { width: 480, descriptor: '480w' },
          { width: 768, descriptor: '768w' },
          { width: 1200, descriptor: '1200w' },
          { width: 1600, descriptor: '1600w' }
        ];

    const baseUrl = src.split('?')[0];
    const formatParam = `&fm=${format}`;

    return breakpoints
      .map(({ width, descriptor }) =>
        `${baseUrl}?auto=format&fit=crop&q=${quality}${formatParam}&w=${width} ${descriptor}`
      )
      .join(', ');
  }, [quality, priority]);

  // Calcola sizes appropriato per mobile
  const calculateSizes = useCallback(() => {
    if (sizes) return sizes;

    // Sizes mobile-first ottimizzato
    return `(max-width: 320px) 320px,
            (max-width: 480px) 480px,
            (max-width: 640px) 640px,
            (max-width: 768px) 768px,
            (max-width: 1024px) 1024px,
            (max-width: 1200px) 1200px,
            (max-width: 1600px) 1600px,
            1920px`;
  }, [sizes]);

  // Intersection Observer per lazy loading avanzato
  useEffect(() => {
    if (priority || lazyLoadMethod === 'native') return;

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
        rootMargin: '100px', // Carica 100px prima dell'entrata nel viewport
        threshold: 0.01      // Trigger anche con 1% di visibilità
      }
    );

    const element = imgRef.current || pictureRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [priority, lazyLoadMethod]);

  // Gestione caricamento immagine
  const handleLoad = () => {
    setIsLoaded(true);
    setShowPlaceholder(false);
    onLoad?.();

    // Timeout per rimuovere il placeholder con animazione fluida
    setTimeout(() => {
      setShowPlaceholder(false);
    }, 100);
  };

  const handleError = () => {
    setHasError(true);
    setShowPlaceholder(false);
    onError?.();
  };

  const urls = generateOptimizedUrls(src, width);
  const sizesAttr = calculateSizes();

  // Placeholder styles
  const getPlaceholderStyle = () => {
    const baseStyle = {
      width: width || '100%',
      height: height || 'auto',
      aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
      background: blurDataURL ? `url(${blurDataURL}) center/cover` : undefined,
      backgroundColor: blurDataURL ? undefined : '#f3f4f6'
    };

    if (placeholder === 'skeleton') {
      return {
        ...baseStyle,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s ease-in-out infinite'
      };
    }

    return baseStyle;
  };

  // Mostra placeholder durante caricamento
  if (!isInView && !priority && lazyLoadMethod !== 'native') {
    return (
      <div
        ref={imgRef}
        className={`image-placeholder ${className}`}
        style={getPlaceholderStyle()}
        role="img"
        aria-label={`Caricamento: ${alt}`}
      >
        {placeholder === 'skeleton' && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse">
              <i className="fas fa-image text-gray-400 text-2xl" aria-hidden="true"></i>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Errore caricamento
  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined)
        }}
        role="img"
        aria-label={`Immagine non disponibile: ${alt}`}
      >
        <div className="text-center p-4">
          <i className="fas fa-exclamation-circle text-2xl mb-2" aria-hidden="true"></i>
          <p className="text-xs">Immagine temporaneamente non disponibile</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Animazione skeleton */}
      <style jsx>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <picture ref={pictureRef} className="relative block">
        {/* AVIF - Format più efficiente per browser moderni */}
        <source
          srcSet={generateResponsiveSrcSet(src, 'avif')}
          type="image/avif"
          sizes={sizesAttr}
        />

        {/* WebP - Miglior compressione per compatibilità estesa */}
        <source
          srcSet={generateResponsiveSrcSet(src, 'webp')}
          type="image/webp"
          sizes={sizesAttr}
        />

        {/* Immagine principale con lazy loading */}
        <img
          ref={imgRef}
          src={urls.jpeg}
          srcSet={generateResponsiveSrcSet(src, 'jpeg')}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizesAttr}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
            objectFit,
            // Ottimizzazioni performance
            contentVisibility: 'auto',
            containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined,
            willChange: 'opacity'
          }}
          // SEO e accessibilità
          fetchPriority={priority ? 'high' : 'auto'}
          role="img"
        />

        {/* Overlay placeholder con animazione */}
        {showPlaceholder && placeholder !== 'none' && (
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              ...getPlaceholderStyle(),
              opacity: isLoaded ? 0 : 1,
              pointerEvents: 'none'
            }}
          />
        )}
      </picture>
    </>
  );
};

export default ResponsiveImage;