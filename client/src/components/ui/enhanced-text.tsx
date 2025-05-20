import React from 'react';

type EnhancedTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  onColor?: boolean;
};

/**
 * Componente di utilità per migliorare la nitidezza e leggibilità del testo
 * 
 * @param children - Il contenuto del testo
 * @param className - Classi CSS aggiuntive
 * @param as - Elemento HTML da utilizzare (default: span)
 * @param onColor - Se il testo è su uno sfondo colorato (applica ottimizzazioni specifiche)
 */
const EnhancedText = ({
  children,
  className = '',
  as: Component = 'span',
  onColor = false,
}: EnhancedTextProps) => {
  const enhancedStyles = {
    WebkitFontSmoothing: 'antialiased' as 'antialiased',
    MozOsxFontSmoothing: 'grayscale' as 'grayscale',
    textRendering: 'optimizeLegibility' as 'optimizeLegibility',
    letterSpacing: '0.01em',
    textShadow: onColor
      ? '0 0 1px rgba(255,255,255,0.1)'
      : '0 0 1px rgba(0,0,0,0.05)',
  };

  const enhancedClass = `${onColor ? 'text-on-color' : 'enhanced-text'} ${className}`;

  return (
    <Component className={enhancedClass} style={enhancedStyles}>
      {children}
    </Component>
  );
};

export default EnhancedText;