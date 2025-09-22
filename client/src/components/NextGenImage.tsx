import React, { useState, useRef, useEffect } from 'react';

interface NextGenImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Componente immagine di nuova generazione con supporto WebP/AVIF
 * Ottimizza Core Web Vitals (LCP, CLS) e performance SEO 2025
 */
const NextGenImage: React.FC<NextGenImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes,
  quality = 85,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const pictureRef = useRef<HTMLElement>(null);

  // Genera URL ottimizzati per Unsplash e immagini locali
  const generateOptimizedUrls = (originalSrc: string, targetWidth?: number) => {
    if (!originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.replace(/\.(png|jpe?g)$/i, '');
      return {
        avif: `${baseUrl}.avif`,
        webp: `${baseUrl}.webp`,
        jpeg: originalSrc
      };
    }

    const baseUrl = originalSrc.split('?')[0];
    const params = new URLSearchParams();
    
    if (targetWidth) params.set('w', targetWidth.toString());
    if (quality) params.set('q', quality.toString());
    params.set('fm', 'auto');
    params.set('fit', 'crop');
    params.set('crop', 'smart');

    return {
      avif: `${baseUrl}?${params.toString()}&fm=avif`,
      webp: `${baseUrl}?${params.toString()}&fm=webp`,
      jpeg: `${baseUrl}?${params.toString()}&fm=jpg`
    };
  };

  // Genera srcset responsive
  const generateResponsiveSrcSet = (src: string, format: 'avif' | 'webp' | 'jpeg') => {
    if (!src.includes('unsplash.com')) {
      if (format === 'jpeg') {
        return src;
      }
      const baseUrl = src.replace(/\.(png|jpe?g)$/i, '');
      return `${baseUrl}.${format}`;
    }

    const baseUrl = src.split('?')[0];
    const formatParam = `&fm=${format}`;
    
    // Dimensioni ottimizzate per diversi dispositivi
    const sizes = [
      { width: 480, descriptor: '480w' },   // Mobile portrait
      { width: 768, descriptor: '768w' },   // Mobile landscape / Tablet portrait
      { width: 1024, descriptor: '1024w' }, // Tablet landscape
      { width: 1440, descriptor: '1440w' }, // Desktop
      { width: 1920, descriptor: '1920w' }  // Large desktop
    ];

    return sizes
      .map(({ width, descriptor }) => 
        `${baseUrl}?auto=format&fit=crop&q=85${formatParam}&w=${width} ${descriptor}`
      )
      .join(', ');
  };

  const urls = generateOptimizedUrls(src, width);

  // Intersection Observer per lazy loading
  useEffect(() => {
    if (priority || !pictureRef.current) return;

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
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (pictureRef.current) {
      observer.observe(pictureRef.current);
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

  // Placeholder durante il caricamento
  if (!isInView && !priority) {
    return (
      <div
        ref={pictureRef as React.RefObject<HTMLDivElement>}
        className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${className}`}
        style={{ 
          width: width || '100%', 
          height: height || 'auto',
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
        role="img"
        aria-label={`Caricamento: ${alt}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <i className="fas fa-image text-gray-400 text-2xl" aria-hidden="true"></i>
        </div>
      </div>
    );
  }

  // Errore caricamento
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={{ 
          width: width || '100%', 
          height: height || 'auto',
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
        role="img"
        aria-label={`Errore caricamento: ${alt}`}
      >
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-2xl mb-2" aria-hidden="true"></i>
          <p className="text-xs">Immagine non disponibile</p>
        </div>
      </div>
    );
  }

  return (
    <picture
      ref={pictureRef as React.RefObject<HTMLPictureElement>}
      className={isLoaded ? 'opacity-100' : 'opacity-0'}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
    >
      {/* AVIF per i browser moderni (miglior compressione) */}
      <source
        srcSet={generateResponsiveSrcSet(src, 'avif')}
        type="image/avif"
        sizes={sizes || '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, 1920px'}
      />
      
      {/* WebP per compatibilità estesa */}
      <source
        srcSet={generateResponsiveSrcSet(src, 'webp')}
        type="image/webp"
        sizes={sizes || '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, 1920px'}
      />
      
      {/* JPEG fallback con srcset responsive */}
      <img
        src={urls.jpeg}
        srcSet={generateResponsiveSrcSet(src, 'jpeg')}
        alt={alt}
        className={className}
        width={width}
        height={height}
        sizes={sizes || '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px, 1920px'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        // @ts-ignore: custom attribute lowercase
        fetchpriority={priority ? 'high' : 'auto'}
        role="img"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          objectFit: 'cover',
          contentVisibility: 'auto',
          containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined
        }}
      />
    </picture>
  );
};

export default NextGenImage;
