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
  const [retryCount, setRetryCount] = useState(0);
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

  // Log when image is about to be loaded
  useEffect(() => {
    if (isInView || priority) {
      console.log('📤 Attempting to load image:', src);
    }
  }, [isInView, priority, src]);

  const handleLoad = () => {
    console.log('🖼️ Image loaded successfully:', src);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.error('🚨 Image failed to load:', src);
    console.error('📊 Image info:', {
      src,
      width,
      height,
      priority,
      retryCount
    });

    // Check if it's a 404 or network error
    if (imgRef.current) {
      console.error('❌ Natural width:', imgRef.current.naturalWidth);
      console.error('❌ Natural height:', imgRef.current.naturalHeight);
    }

    // Retry once for network errors (but not for missing files)
    if (retryCount < 1 && !src.includes('default-blog-cover')) {
      console.log('🔄 Retrying image load...');
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        if (imgRef.current) {
          imgRef.current.src = src + '?retry=' + Date.now();
        }
      }, 1000);
    } else {
      setHasError(true);
      onError?.();
    }
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
      className={`${className} ${isLoaded && !priority ? 'lazy-loaded' : ''}`}
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
        contentVisibility: priority ? 'visible' : 'auto',
        containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined,
        ...style
      }}
    />
  );
};

export default OptimizedImage;
