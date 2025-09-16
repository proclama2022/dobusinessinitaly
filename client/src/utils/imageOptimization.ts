/**
 * Utility per ottimizzazione immagini e performance
 * Implementa best practices per Core Web Vitals
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  sizes?: string;
  priority?: boolean;
}

/**
 * Genera srcSet ottimizzato per responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return widths
    .map(width => {
      const optimizedSrc = optimizeImageUrl(baseSrc, { width, format: 'webp' });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
}

/**
 * Genera sizes attribute per responsive images
 */
export function generateSizes(breakpoints?: { [key: string]: string }): string {
  const defaultBreakpoints = {
    '(max-width: 320px)': '320px',
    '(max-width: 640px)': '640px',
    '(max-width: 768px)': '768px',
    '(max-width: 1024px)': '1024px',
    '(max-width: 1280px)': '1280px',
  };

  const sizes = breakpoints || defaultBreakpoints;
  
  return Object.entries(sizes)
    .map(([query, size]) => `${query} ${size}`)
    .join(', ') + ', 100vw';
}

/**
 * Ottimizza URL immagine con parametri di qualità e formato
 */
export function optimizeImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const { width, height, quality = 85, format = 'webp' } = options;
  
  // Se l'immagine è già ottimizzata o è un'icona SVG, restituisci l'originale
  if (src.includes('.svg') || src.includes('optimized') || src.startsWith('data:')) {
    return src;
  }

  // Per immagini locali, aggiungi parametri di ottimizzazione
  const url = new URL(src, window.location.origin);
  
  if (width) url.searchParams.set('w', width.toString());
  if (height) url.searchParams.set('h', height.toString());
  if (quality !== 85) url.searchParams.set('q', quality.toString());
  if (format !== 'jpg') url.searchParams.set('f', format);
  
  return url.toString();
}

/**
 * Preload immagini critiche per migliorare LCP
 */
export function preloadCriticalImages(images: string[]): void {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
}

/**
 * Lazy load immagini non critiche
 */
export function setupLazyLoading(): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Calcola aspect ratio per prevenire CLS
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Verifica supporto formati moderni
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

export function supportsAVIF(): Promise<boolean> {
  return new Promise(resolve => {
    const avif = new Image();
    avif.onload = avif.onerror = () => resolve(avif.height === 2);
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}