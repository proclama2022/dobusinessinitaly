import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeItalianProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'luxury' | 'heritage' | 'artisan';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'square' | 'pill';
  interactive?: boolean;
  pulse?: boolean;
}

const BadgeItalian = forwardRef<HTMLSpanElement, BadgeItalianProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    interactive = false,
    pulse = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 italian-nav-text";

    const variantClasses = {
      default: "bg-italian-green text-white shadow-md",
      success: "bg-olive-grove text-white shadow-md",
      warning: "bg-lemon-zest text-espresso-dark shadow-md",
      error: "bg-italian-red text-white shadow-md",
      luxury: "bg-gradient-to-r from-venetian-gold to-florentine-bronze text-white shadow-lg",
      heritage: "bg-gradient-to-r from-chianti-wine to-tuscan-terracotta text-white shadow-lg",
      artisan: "bg-travertine text-tuscan-umber border-2 border-tuscan-umber"
    };

    const sizeClasses = {
      sm: "px-2 py-1 text-xs min-w-[20px] min-h-[20px]",
      md: "px-3 py-1.5 text-sm min-w-[24px] min-h-[24px]",
      lg: "px-4 py-2 text-base min-w-[32px] min-h-[32px]"
    };

    const shapeClasses = {
      rounded: "rounded-md",
      square: "rounded-none",
      pill: "rounded-full"
    };

    const interactiveClasses = interactive
      ? "cursor-pointer hover:scale-105 hover:shadow-xl active:scale-95"
      : "";

    const pulseClasses = pulse
      ? "animate-italian-pulse"
      : "";

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          shapeClasses[shape],
          interactiveClasses,
          pulseClasses,
          className
        )}
        {...props}
      >
        {children}

        {/* Italian decorative elements for luxury variants */}
        {(variant === 'luxury' || variant === 'heritage') && (
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/20 to-transparent opacity-50" />
        )}

        {/* Heritage pattern overlay */}
        {variant === 'heritage' && (
          <div className="absolute inset-0 opacity-20 rounded-inherit">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.1) 1px,
                rgba(255,255,255,0.1) 2px
              )`
            }} />
          </div>
        )}

        {/* Artisan texture */}
        {variant === 'artisan' && (
          <div className="absolute inset-0 opacity-30 rounded-inherit">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 1px,
                rgba(160, 82, 45, 0.1) 1px,
                rgba(160, 82, 45, 0.1) 2px
              )`
            }} />
          </div>
        )}
      </span>
    );
  }
);

BadgeItalian.displayName = 'BadgeItalian';

export { BadgeItalian };

// Premium Badge with enhanced styling
export const BadgeItalianPremium = forwardRef<HTMLSpanElement, BadgeItalianProps & {
  icon?: React.ReactNode;
  crown?: boolean;
}>(({ icon, crown, className, children, ...props }, ref) => {
  return (
    <div className="relative group">
      {/* Crown decoration */}
      {crown && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-4 h-3 bg-venetian-gold rounded-t-full relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-venetian-gold" />
          </div>
        </div>
      )}

      <BadgeItalian
        ref={ref}
        variant="luxury"
        size="md"
        className={cn(
          "relative overflow-hidden group/badge",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          className
        )}
        {...props}
      >
        <div className="relative z-10 flex items-center gap-1">
          {icon && (
            <span className="w-3 h-3 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
          )}
          {children}
        </div>

        {/* Floating accent */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-chianti-wine rounded-full animate-italian-pulse opacity-70" />
      </BadgeItalian>
    </div>
  );
});

BadgeItalianPremium.displayName = 'BadgeItalianPremium';

// Artisan Badge with handcrafted aesthetic
export const BadgeItalianArtisan = forwardRef<HTMLSpanElement, BadgeItalianProps & {
  texture?: 'paper' | 'fabric' | 'stone';
  stamp?: boolean;
}>(({ texture = 'stone', stamp, className, children, ...props }, ref) => {
  const textureVariants = {
    paper: "bg-olive-grove/20 text-olive-grove-dark border border-olive-grove/40",
    fabric: "bg-lavender-field/20 text-lavender-field-dark border border-lavender-field/40",
    stone: "bg-travertine text-tuscan-umber-dark border-2 border-tuscan-umber/50"
  };

  return (
    <div className="relative">
      {/* Stamp effect */}
      {stamp && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full border-2 border-tuscan-umber/30 rounded-inherit transform rotate-3 scale-105" />
        </div>
      )}

      <BadgeItalian
        ref={ref}
        variant="artisan"
        className={cn(
          "relative overflow-hidden",
          textureVariants[texture],
          // Texture overlay
          "after:absolute after:inset-0 after:rounded-inherit after:opacity-20 after:pointer-events-none",
          texture === 'paper' && "after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-olive-grove/10",
          texture === 'fabric' && "after:bg-gradient-to-br after:from-transparent after:via-white/20 after:to-lavender-field/10",
          texture === 'stone' && "after:bg-gradient-to-br after:from-transparent after:via-gray-300/10 after:to-tuscan-umber/10",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </BadgeItalian>
    </div>
  );
});

BadgeItalianArtisan.displayName = 'BadgeItalianArtisan';

// Status Badge with semantic meaning
export const BadgeItalianStatus = forwardRef<HTMLSpanElement, BadgeItalianProps & {
  status: 'new' | 'updated' | 'featured' | 'premium' | 'limited' | 'exclusive';
}>(({ status, className, ...props }, ref) => {
  const statusConfig = {
    new: {
      variant: 'success' as const,
      children: 'Nuovo',
      pulse: true
    },
    updated: {
      variant: 'warning' as const,
      children: 'Aggiornato'
    },
    featured: {
      variant: 'luxury' as const,
      children: 'In evidenza'
    },
    premium: {
      variant: 'heritage' as const,
      children: 'Premium'
    },
    limited: {
      variant: 'error' as const,
      children: 'Edizione limitata'
    },
    exclusive: {
      variant: 'luxury' as const,
      children: 'Esclusivo'
    }
  };

  const config = statusConfig[status];

  return (
    <BadgeItalian
      ref={ref}
      variant={config.variant}
      pulse={config.pulse}
      className={cn("uppercase tracking-wider", className)}
      {...props}
    >
      {props.children || config.children}
    </BadgeItalian>
  );
});

BadgeItalianStatus.displayName = 'BadgeItalianStatus';

