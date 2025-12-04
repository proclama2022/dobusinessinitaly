import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonItalianProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury' | 'artisan' | 'heritage';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

export const ButtonItalian = forwardRef<HTMLButtonElement, ButtonItalianProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    fullWidth = false,
    loading = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed italian-button";

    const variantClasses = {
      primary: "bg-italian-green hover:bg-italian-green-dark text-white hover:shadow-italian-glow focus:ring-italian-green",
      secondary: "bg-tuscan-terracotta hover:bg-tuscan-terracotta-dark text-white hover:shadow-xl focus:ring-tuscan-terracotta",
      outline: "border-2 border-italian-green text-italian-green hover:bg-italian-green hover:text-white focus:ring-italian-green",
      ghost: "text-italian-green hover:bg-italian-green/10 focus:ring-italian-green",
      luxury: "bg-gradient-to-r from-venetian-gold to-florentine-bronze hover:from-venetian-gold-dark hover:to-florentine-bronze-dark text-white hover:shadow-xl focus:ring-venetian-gold",
      artisan: "bg-travertine border-2 border-tuscan-umber text-tuscan-umber-dark hover:bg-tuscan-umber hover:text-white focus:ring-tuscan-umber",
      heritage: "bg-gradient-to-r from-italian-green to-mediterranean-blue hover:from-italian-green-dark hover:to-mediterranean-blue-dark text-white hover:shadow-xl focus:ring-italian-green"
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-md",
      lg: "px-8 py-4 text-lg rounded-lg",
      xl: "px-10 py-5 text-xl rounded-lg"
    };

    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-current/20 rounded-inherit">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-italian-pulse" />
          </div>
        )}

        {/* Content */}
        <div className="flex items-center gap-2">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && !loading && (
            <span className={cn(iconSizeClasses[size], "transition-transform duration-300 group-hover:scale-110")}>
              {icon}
            </span>
          )}

          {/* Button Text */}
          <span className={cn(
            loading && "opacity-0",
            "transition-all duration-300"
          )}>
            {children}
          </span>

          {/* Right Icon */}
          {icon && iconPosition === 'right' && !loading && (
            <span className={cn(iconSizeClasses[size], "transition-transform duration-300 group-hover:translate-x-1")}>
              {icon}
            </span>
          )}
        </div>

        {/* Italian decorative elements for luxury variants */}
        {(variant === 'luxury' || variant === 'heritage') && (
          <>
            <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-px rounded-inherit bg-gradient-to-r from-venetian-gold to-italian-red opacity-20 blur-sm" />
          </>
        )}

        {/* Heritage pattern overlay */}
        {variant === 'heritage' && (
          <div className="absolute inset-0 opacity-10 rounded-inherit">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`
            }} />
          </div>
        )}
      </button>
    );
  }
);

ButtonItalian.displayName = 'ButtonItalian';

export default ButtonItalian;

// Premium Button with enhanced Italian styling
export const ButtonItalianPremium = forwardRef<HTMLButtonElement, ButtonItalianProps & {
  accent?: string;
  ribbon?: string;
}>(({ accent, ribbon, className, ...props }, ref) => {
  return (
    <div className="relative group">
      {/* Ribbon */}
      {ribbon && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-chianti-wine transform rotate-45 origin-bottom-left"></div>
            <span className="absolute top-1 right-1 text-white text-xs font-medium italian-nav-text transform rotate-45 text-white/90">
              {ribbon}
            </span>
          </div>
        </div>
      )}

      <ButtonItalian
        ref={ref}
        variant="luxury"
        className={cn(
          "relative overflow-hidden group/btn",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          className
        )}
        {...props}
      />

      {/* Accent line */}
      {accent && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-venetian-gold via-italian-red to-venetian-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      )}
    </div>
  );
});

ButtonItalianPremium.displayName = 'ButtonItalianPremium';

// Artisan Button with handcrafted aesthetic
export const ButtonItalianArtisan = forwardRef<HTMLButtonElement, ButtonItalianProps & {
  texture?: 'paper' | 'fabric' | 'stone';
}>(({ texture = 'stone', className, ...props }, ref) => {
  const textureClasses = {
    paper: "bg-olive-grove/10 border border-olive-grove/30 hover:bg-olive-grove hover:text-white",
    fabric: "bg-lavender-field/10 border border-lavender-field/30 hover:bg-lavender-field hover:text-white",
    stone: "bg-travertine border border-tuscan-umber/30 hover:bg-tuscan-umber hover:text-white"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 italian-button",
        textureClasses[texture],
        "hover:shadow-lg hover:scale-105 focus:ring-tuscan-umber",
        // Texture overlay
        "after:absolute after:inset-0 after:rounded-inherit after:opacity-10 after:pointer-events-none",
        texture === 'paper' && "after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-olive-grove/10",
        texture === 'fabric' && "after:bg-gradient-to-br after:from-transparent after:via-white/20 after:to-lavender-field/10",
        texture === 'stone' && "after:bg-gradient-to-br after:from-transparent after:via-gray-200/10 after:to-tuscan-umber/10",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{props.children}</span>
    </button>
  );
});

ButtonItalianArtisan.displayName = 'ButtonItalianArtisan';
