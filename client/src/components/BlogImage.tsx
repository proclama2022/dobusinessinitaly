import React, { useState, useEffect, useRef } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface BlogImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  caption?: string;
  isCover?: boolean;
}

/**
 * Componente immagine ottimizzato per blog post con:
 * - Lazy loading intelligente basato sulla posizione nel contenuto
 * - Compressione dinamica per diverse dimensioni
 * - Placeholder con gradiente di contenuto
 * - Supporto per caption e attributi SEO
 * - Ottimizzato per la lettura mobile
 */
const BlogImage: React.FC<BlogImageProps> = ({
  src,
  alt,
  title,
  className = '',
  width = 800,
  height = 450,
  priority = false,
  caption,
  isCover = false
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Lazy loading intelligente per immagini nel contenuto
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasEnteredView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Preload anticipato per immagini nel contenuto
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Genera placeholder specifico per blog
  const generateBlogPlaceholder = () => {
    // Pattern professionale per placeholder di blog
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#e9ecef;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f8f9fa;stop-opacity:1" />
          </linearGradient>
          <pattern id="blogPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="url(#blogGrad)"/>
            <circle cx="10" cy="10" r="1" fill="#dee2e6" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blogPattern)"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="system-ui" font-size="16" fill="#6c757d" opacity="0.5">
          📷 Blog Image
        </text>
      </svg>
    `)}`;
  };

  // Calcola sizes ottimizzato per blog
  const getBlogSizes = () => {
    if (isCover) {
      return '(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px';
    }
    return '(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 800px';
  };

  return (
    <figure
      ref={imageRef}
      className={`blog-image-container ${className} ${
        hasEnteredView ? 'image-entered-view' : ''
      } ${isCover ? 'blog-cover-image' : 'blog-content-image'}`}
      style={{
        margin: isCover ? '0 0 2rem 0' : '1.5rem 0',
        position: 'relative'
      }}
    >
      {/* Immagine principale */}
      <div className={`relative overflow-hidden rounded-lg ${
        isCover ? 'shadow-xl' : 'shadow-md'
      } group`}>
        <ResponsiveImage
          src={src}
          alt={alt}
          title={title || alt}
          width={width}
          height={height}
          priority={priority}
          placeholder="blur"
          blurDataURL={generateBlogPlaceholder()}
          sizes={getBlogSizes()}
          quality={isCover ? 90 : 85}
          className={`w-full ${
            isCover ? 'h-[300px] md:h-[400px] lg:h-[450px]' : 'h-auto'
          } object-cover transform group-hover:scale-105 transition-transform duration-700`}
        />

        {/* Overlay per immagini cover */}
        {isCover && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Indicatore di caricamento */}
        {!isVisible && !priority && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="fas fa-image text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
          <i className="fas fa-info-circle mr-1" />
          {caption}
        </figcaption>
      )}

      {/* Stili animazione */}
      <style jsx>{`
        .blog-image-container {
          transition: all 0.3s ease;
        }

        .image-entered-view {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .blog-cover-image:hover {
          transform: translateY(-2px);
        }

        .blog-content-image:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </figure>
  );
};

export default BlogImage;