import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface HeroItalianProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  className?: string;
  variant?: 'split' | 'centered' | 'asymmetrical' | 'featured';
}

export const HeroItalian: React.FC<HeroItalianProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  className,
  variant = 'centered'
}) => {
  const baseClasses = "relative overflow-hidden min-h-screen";

  const variantClasses = {
    split: "italian-hero-split",
    centered: "italian-hero-centered",
    asymmetrical: "italian-hero-asymmetrical",
    featured: "italian-hero"
  };

  const contentClasses = {
    split: "flex items-center justify-center p-12",
    centered: "flex flex-col items-center justify-center text-center max-w-4xl p-8",
    asymmetrical: "flex items-center justify-center p-12",
    featured: "flex flex-col items-center justify-center text-center max-w-5xl p-8"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Background with Italian gradient or image */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 gradient-roman-architect opacity-30 z-0" />
      )}

      <div className={cn("relative z-10 w-full", contentClasses[variant])}>
        {/* Subtitle with Italian styling */}
        {subtitle && (
          <p className="italian-accent-text text-venetian-gold text-lg md:text-xl mb-4 animate-italian-fade-in-scale">
            {subtitle}
          </p>
        )}

        {/* Main title with Italian typography */}
        <h1 className="italian-headline text-white mb-6 animate-italian-slide-in-down">
          <span className="text-gradient-roman-architect">
            {title}
          </span>
        </h1>

        {/* Description with Italian body text */}
        <p className="italian-body-text text-white/90 mb-8 max-w-2xl animate-italian-fade-in-up">
          {description}
        </p>

        {/* Actions with Italian button styling */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-italian-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                className="italian-button bg-italian-green hover:bg-italian-green-dark text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-italian-glow"
              >
                {primaryAction.label}
              </Button>
            )}

            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                className="italian-button border-2 border-white/30 text-white hover:bg-white hover:text-italian-green px-8 py-3 rounded-md transition-all duration-300 hover:scale-105"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}

        {/* Decorative Italian elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 gradient-tuscan-terracotta opacity-20" />

        {/* Italian pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,255,255,.1) 35px,
              rgba(255,255,255,.1) 70px
            )`
          }} />
        </div>
      </div>

      {/* Floating Italian elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-venetian-gold/20 rounded-full blur-2xl animate-italian-float" />
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-italian-red/20 rounded-full blur-xl animate-italian-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 left-20 w-12 h-12 bg-mediterranean-blue/20 rounded-full blur-lg animate-italian-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default HeroItalian;