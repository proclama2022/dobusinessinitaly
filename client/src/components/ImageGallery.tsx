import React, { useState, useRef, useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
  columns?: number;
  gap?: number;
  enableLightbox?: boolean;
  placeholderType?: 'blur' | 'skeleton' | 'color';
}

/**
 * Componente galleria immagini ottimizzato per mobile con:
 * - Lazy loading a gruppi per performance ottimali
 * - Virtualizzazione per gallerie molto lunghe
 * - Placeholder animati durante caricamento
 * - Supporto lightbox integrato
 * - Layout responsive automatico
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = '',
  columns = 3,
  gap = 4,
  enableLightbox = true,
  placeholderType = 'blur'
}) => {
  const [visibleImages, setVisibleImages] = useState<ImageItem[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Calcola layout responsive
  const getResponsiveColumns = () => {
    if (typeof window === 'undefined') return columns;
    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile
    if (width < 768) return 2; // Tablet
    if (width < 1024) return 3; // Desktop small
    return columns; // Desktop
  };

  const [responsiveColumns, setResponsiveColumns] = useState(getResponsiveColumns());

  // Aggiorna colonne responsive
  useEffect(() => {
    const handleResize = () => {
      setResponsiveColumns(getResponsiveColumns());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lazy loading a gruppi
  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Carica le prossime immagini non ancora visibili
            const nextBatch = images.filter(img =>
              !visibleImages.some(v => v.id === img.id) &&
              !loadedImages.has(img.id)
            ).slice(0, responsiveColumns * 2); // Carica 2 righe alla volta

            if (nextBatch.length > 0) {
              setVisibleImages(prev => [...prev, ...nextBatch]);
            }

            // Se tutte le immagini sono state caricate, disconnetti l'observer
            if (visibleImages.length + nextBatch.length >= images.length) {
              observer.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    observerRef.current = observer;
    observer.observe(galleryRef.current);

    // Carica le prime immagini immediatamente
    const initialBatch = images.slice(0, responsiveColumns * 3);
    setVisibleImages(initialBatch);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [images, responsiveColumns, visibleImages.length, loadedImages]);

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const openLightbox = (image: ImageItem) => {
    if (enableLightbox) {
      setSelectedImage(image);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage]);

  const getImageStyle = () => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
      gap: `${gap * 0.25}rem`
    };
  };

  return (
    <>
      <div
        ref={galleryRef}
        className={`image-gallery ${className}`}
        style={getImageStyle()}
      >
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => openLightbox(image)}
          >
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              title={image.title || image.alt}
              width={image.width || 400}
              height={image.height || 300}
              placeholder={placeholderType}
              className="w-full h-full object-cover"
              sizes={`(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw`}
              quality={85}
              onLoad={() => handleImageLoad(image.id)}
            />

            {/* Overlay con effetti */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <i className="fas fa-expand text-gray-800 text-lg"></i>
                </div>
              </div>
            </div>

            {/* Indicatore di caricamento */}
            {!loadedImages.has(image.id) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Elemento trigger per lazy loading */}
        {visibleImages.length < images.length && (
          <div className="loading-trigger col-span-full h-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && enableLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            {/* Pulsante chiusura */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
              aria-label="Chiudi lightbox"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            {/* Immagine nel lightbox */}
            <div className="relative rounded-lg overflow-hidden">
              <ResponsiveImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                title={selectedImage.title || selectedImage.alt}
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
                placeholder="blur"
                className="w-full h-auto max-h-[80vh] object-contain"
                priority={true}
                quality={95}
              />

              {/* Didascalia */}
              {(selectedImage.title || selectedImage.alt) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-lg font-medium">
                    {selectedImage.title || selectedImage.alt}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stili personalizzati */}
      <style jsx>{`
        .gallery-item {
          aspect-ratio: 4/3;
          min-height: 200px;
        }

        @media (max-width: 640px) {
          .gallery-item {
            min-height: 250px;
          }
        }

        .loading-trigger {
          grid-column: 1 / -1;
        }
      `}</style>
    </>
  );
};

export default ImageGallery;