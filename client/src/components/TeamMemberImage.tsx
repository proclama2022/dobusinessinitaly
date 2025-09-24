import React, { useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface TeamMemberImageProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Componente immagine ottimizzato per membri del team con:
 * - Placeholder blur generato dinamicamente
 * - Animazioni di caricamento progressive
 * - Gestione errori con fallback elegante
 * - Ottimizzato per mobile con srcset responsive
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({
  src,
  alt,
  name,
  className = '',
  width = 400,
  height = 400,
  priority = false
}) => {
  const [blurDataURL, setBlurDataURL] = useState<string>('');

  // Genera un placeholder blur dinamico basato sul nome
  const generateBlurPlaceholder = () => {
    // Crea un pattern SVG unico basato sul nome
    const colors = ['#009246', '#ce2b37', '#ffffff']; // Colori bandiera italiana
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % colors.length;

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors[colorIndex]};stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:${colors[(colorIndex + 1) % colors.length]};stop-opacity:0.05" />
          </linearGradient>
          <filter id="blur${hash}">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad${hash})" filter="url(#blur${hash})" />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="system-ui" font-size="24" fill="${colors[colorIndex]}" opacity="0.3">
          ${name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  React.useEffect(() => {
    // Genera il placeholder blur quando il componente monta
    setBlurDataURL(generateBlurPlaceholder());
  }, [name, width, height]);

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <ResponsiveImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 480px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 480px, 400px"
        quality={85}
      />

      {/* Overlay con effetto gradiente italiano */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-[#009246] via-transparent to-[#ce2b37] transition-opacity duration-500 pointer-events-none"></div>

      {/* Icone social che appaiono all'hover */}
      <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <i className="fab fa-linkedin-in text-[#009246] text-sm"></i>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <i className="fas fa-envelope text-[#ce2b37] text-sm"></i>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberImage;