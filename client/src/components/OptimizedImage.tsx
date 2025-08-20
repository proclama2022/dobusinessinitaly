import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Per immagini above-the-fold
  sizes?: string; // Per responsive images
  quality?: number; // Qualità immagine (1-100)
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 80,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Se priority=true, carica subito
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer per lazy loading
  useEffect(() => {
    if (priority || isInView) return;

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
        rootMargin: '50px' // Inizia a caricare 50px prima che entri in viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Genera URL ottimizzato con parametri Unsplash
  const getOptimizedSrc = (originalSrc: string, w?: number, h?: number, q: number = quality) => {
    // Se è un'immagine Unsplash, aggiungi parametri di ottimizzazione
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      if (w) url.searchParams.set('w', w.toString());
      if (h) url.searchParams.set('h', h.toString());
      url.searchParams.set('q', q.toString());
      url.searchParams.set('fm', 'webp'); // Formato WebP
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('crop', 'smart');
      return url.toString();
    }
    return originalSrc;
  };

  // Genera srcSet per responsive images
  const generateSrcSet = (originalSrc: string) => {
    if (!originalSrc.includes('unsplash.com')) return undefined;
    
    const breakpoints = [640, 768, 1024, 1280, 1920];
    return breakpoints
      .map(bp => `${getOptimizedSrc(originalSrc, bp)} ${bp}w`)
      .join(', ');
  };

  const optimizedSrc = getOptimizedSrc(src, width, height);
  const srcSet = generateSrcSet(src);

  // Placeholder blur effect
  const placeholderStyle = placeholder === 'blur' && blurDataURL ? {
    backgroundImage: `url(${blurDataURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        ...placeholderStyle
      }}
    >
      {/* Placeholder durante il caricamento */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Immagine principale */}
      {isInView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`
            transition-opacity duration-300 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'hidden' : 'block'}
            w-full h-full object-cover
          `}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            console.warn(`Failed to load image: ${src}`);
          }}
          // SEO attributes
          itemProp="image"
        />
      )}

      {/* Fallback per errori */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Immagine non disponibile</p>
          </div>
        </div>
      )}

      {/* Schema markup per immagini */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": optimizedSrc,
            "width": width,
            "height": height,
            "description": alt
          })
        }}
      />
    </div>
  );
};

export default OptimizedImage;