import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type EnhancedIconProps = {
  icon: IconDefinition;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  fixedWidth?: boolean;
  onColor?: boolean;
  title?: string;
};

/**
 * Componente di utilità per migliorare la nitidezza e leggibilità delle icone FontAwesome
 * 
 * @param icon - L'icona FontAwesome da visualizzare
 * @param className - Classi CSS aggiuntive
 * @param size - Dimensione dell'icona
 * @param fixedWidth - Se l'icona deve avere una larghezza fissa
 * @param onColor - Se l'icona è su uno sfondo colorato (applica ottimizzazioni specifiche)
 * @param title - Titolo per l'accessibilità
 */
const EnhancedIcon = ({
  icon,
  className = '',
  size,
  fixedWidth = true,
  onColor = false,
  title,
}: EnhancedIconProps) => {
  const enhancedStyles = {
    WebkitFontSmoothing: 'antialiased' as 'antialiased',
    MozOsxFontSmoothing: 'grayscale' as 'grayscale',
    textRendering: 'auto' as 'auto',
    filter: onColor
      ? 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))'
      : 'drop-shadow(0 0 0.5px rgba(0,0,0,0.1))',
    transform: 'translateZ(0)',
  };

  return (
    <span className="icon-container inline-flex items-center justify-center">
      <FontAwesomeIcon
        icon={icon}
        className={className}
        size={size}
        fixedWidth={fixedWidth}
        style={enhancedStyles}
        title={title}
        aria-hidden={!title}
      />
    </span>
  );
};

/**
 * Componente di utilità per migliorare la nitidezza e leggibilità delle icone FontAwesome con classi CSS
 * 
 * @param iconClass - La classe CSS dell'icona (es. "fas fa-user")
 * @param className - Classi CSS aggiuntive
 * @param onColor - Se l'icona è su uno sfondo colorato (applica ottimizzazioni specifiche)
 * @param title - Titolo per l'accessibilità
 */
export const EnhancedCssIcon = ({
  iconClass,
  className = '',
  onColor = false,
  title,
}: {
  iconClass: string;
  className?: string;
  onColor?: boolean;
  title?: string;
}) => {
  const enhancedStyles = {
    WebkitFontSmoothing: 'antialiased' as 'antialiased',
    MozOsxFontSmoothing: 'grayscale' as 'grayscale',
    textRendering: 'auto' as 'auto',
    filter: onColor
      ? 'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))'
      : 'drop-shadow(0 0 0.5px rgba(0,0,0,0.1))',
    transform: 'translateZ(0)',
  };

  return (
    <span className="icon-container inline-flex items-center justify-center">
      <i 
        className={`${iconClass} ${className}`} 
        style={enhancedStyles}
        title={title}
        aria-hidden={!title}
      ></i>
    </span>
  );
};

export default EnhancedIcon;