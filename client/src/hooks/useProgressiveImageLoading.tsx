import { useState, useEffect, useRef } from 'react';

interface UseProgressiveImageLoadingOptions {
  src: string;
  placeholderSrc?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseProgressiveImageLoadingReturn {
  isLoading: boolean;
  hasError: boolean;
  isLoaded: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
  triggerLoad: () => void;
}

/**
 * Hook per caricamento progressivo delle immagini con:
 * - Intersection Observer per lazy loading intelligente
 * - Gestione errori con fallback
 * - Placeholder dinamici
 * - Controllo manuale del caricamento
 * - Ottimizzato per performance mobile
 */
export const useProgressiveImageLoading = ({
  src,
  placeholderSrc,
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true
}: UseProgressiveImageLoadingOptions): UseProgressiveImageLoadingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const triggerLoad = () => {
    if (!imageRef.current || isLoaded || isLoading) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);

      // Aggiorna l'immagine nel DOM
      if (imageRef.current) {
        imageRef.current.src = src;
      }
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.src = src;
  };

  // Configura Intersection Observer per lazy loading
  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerLoad();

            if (triggerOnce) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current = observer;
    observer.observe(imageRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, threshold, rootMargin, triggerOnce]);

  // Cleanup quando cambia l'URL dell'immagine
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setIsLoading(false);
  }, [src]);

  return {
    isLoading,
    hasError,
    isLoaded,
    imageRef,
    triggerLoad
  };
};

/**
 * Hook per generare placeholder blur dinamici
 */
export const useImagePlaceholder = (width: number, height: number, seed?: string) => {
  const [placeholderURL, setPlaceholderURL] = useState<string>('');

  useEffect(() => {
    const generatePlaceholder = () => {
      // Genera colori basati sul seed per consistenza
      const generateColor = (index: number) => {
        const hash = seed ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : index;
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 85%)`;
      };

      const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="placeholderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${generateColor(0)};stop-opacity:1" />
              <stop offset="50%" style="stop-color:${generateColor(1)};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${generateColor(2)};stop-opacity:1" />
            </linearGradient>
            <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#placeholderGrad)" filter="url(#blur)" />
          ${seed ? `
            <text x="50%" y="50%" text-anchor="middle" dy=".3em"
                  font-family="system-ui" font-size="14"
                  fill="#666" opacity="0.6">
              ${seed.substring(0, 2).toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

      return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    setPlaceholderURL(generatePlaceholder());
  }, [width, height, seed]);

  return placeholderURL;
};

/**
 * Hook per il precaricamento intelligente delle immagini
 */
export const useImagePreloader = (images: string[], priority: boolean = false) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!priority) return;

    const preloadImages = async () => {
      for (const src of images) {
        if (loadedImages.has(src)) continue;

        setLoadingImages(prev => new Set(prev).add(src));

        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });

          setLoadedImages(prev => new Set(prev).add(src));
        } catch (error) {
          console.warn(`Failed to preload image: ${src}`);
        } finally {
          setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(src);
            return newSet;
          });
        }
      }
    };

    if (priority) {
      // Ritarda il precaricamento per non bloccare il rendering iniziale
      setTimeout(preloadImages, 100);
    }
  }, [images, priority, loadedImages]);

  return {
    loadedImages,
    loadingImages,
    isLoaded: (src: string) => loadedImages.has(src),
    isLoading: (src: string) => loadingImages.has(src)
  };
};

export default useProgressiveImageLoading;