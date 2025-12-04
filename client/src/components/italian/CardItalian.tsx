import React from 'react';
import { cn } from '@/lib/utils';

interface CardItalianProps {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  actions?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'featured' | 'minimal' | 'premium' | 'architectural';
  onClick?: () => void;
  children?: React.ReactNode;
}

export const CardItalian: React.FC<CardItalianProps> = ({
  title,
  description,
  image,
  badge,
  actions,
  className,
  variant = 'default',
  onClick,
  children
}) => {
  const baseClasses = "group relative overflow-hidden rounded-lg transition-all duration-500";

  const variantClasses = {
    default: "bg-white border border-roman-marble shadow-md hover:shadow-xl hover:border-tuscan-terracotta",
    featured: "bg-gradient-to-br from-roman-marble to-travertine border border-venetian-gold/30 shadow-lg hover:shadow-2xl hover:border-venetian-gold",
    minimal: "bg-white/50 backdrop-blur-sm border border-milanese-silver/20 hover:bg-white hover:border-milanese-silver",
    premium: "bg-gradient-to-br from-italian-green/5 to-italian-red/5 border border-italian-green/20 shadow-lg hover:shadow-xl hover:border-italian-green/40",
    architectural: "bg-travertine border border-tuscan-umber/30 shadow-lg hover:shadow-2xl hover:border-tuscan-terracotta"
  };

  const contentClasses = {
    default: "p-6",
    featured: "p-8",
    minimal: "p-4",
    premium: "p-6",
    architectural: "p-7"
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
    >
      {/* Italian pattern overlay for premium variants */}
      {(variant === 'featured' || variant === 'premium') && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 20px
            )`,
            color: 'inherit'
          }} />
        </div>
      )}

      {/* Card Header */}
      {image && (
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-venetian-gold text-white text-xs font-medium rounded-full italian-nav-text">
                {badge}
              </span>
            </div>
          )}

          {/* Italian corner decoration */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-italian-green" />
        </div>
      )}

      {/* Card Content */}
      <div className={cn("relative z-10", contentClasses[variant])}>
        {/* Title */}
        <h3 className={cn(
          "italian-subheadline mb-3 transition-colors duration-300",
          variant === 'featured' ? "text-gradient-roman-architect" : "text-italian-green",
          "group-hover:text-tuscan-terracotta"
        )}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={cn(
            "italian-body-text mb-4 text-neutral-600",
            variant === 'minimal' ? "text-sm" : ""
          )}>
            {description}
          </p>
        )}

        {/* Children */}
        {children}

        {/* Actions */}
        {actions && (
          <div className="mt-6 flex items-center justify-between">
            {actions}
          </div>
        )}

        {/* Italian decorative elements */}
        {variant === 'featured' && (
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-venetian-gold to-italian-red rounded-tl-lg opacity-60" />
        )}

        {variant === 'architectural' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 gradient-tuscan-terracotta" />
        )}
      </div>

      {/* Hover effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-italian-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Subtle border animation */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-italian-green/20 transition-all duration-500 rounded-lg pointer-events-none" />
    </div>
  );
};

// Featured Card Component with enhanced Italian styling
export const CardItalianFeatured: React.FC<CardItalianProps & {
  stats?: { label: string; value: string }[];
  icon?: React.ReactNode;
}> = ({ title, description, stats, icon, ...props }) => {
  return (
    <CardItalian variant="featured" {...props}>
      {/* Icon */}
      {icon && (
        <div className="w-12 h-12 mb-4 text-venetian-gold flex items-center justify-center">
          {icon}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="italian-headline text-tuscan-terracotta">
                {stat.value}
              </div>
              <div className="italian-accent-text text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </CardItalian>
  );
};

// Minimal Card Component for clean Italian aesthetic
export const CardItalianMinimal: React.FC<CardItalianProps> = (props) => {
  return (
    <CardItalian variant="minimal" {...props} />
  );
};

// Premium Card Component with luxury Italian styling
export const CardItalianPremium: React.FC<CardItalianProps & {
  highlight?: string;
  ribbon?: string;
}> = ({ title, description, highlight, ribbon, ...props }) => {
  return (
    <div className="relative">
      {/* Ribbon */}
      {ribbon && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-italian-red transform rotate-45 origin-bottom-left"></div>
            <span className="absolute top-2 right-2 text-white text-xs font-medium italian-nav-text transform rotate-45">
              {ribbon}
            </span>
          </div>
        </div>
      )}

      <CardItalian variant="premium" {...props}>
        {/* Highlight */}
        {highlight && (
          <div className="mb-4 p-3 bg-venetian-gold/10 border-l-4 border-venetian-gold">
            <p className="italian-accent-text text-venetian-gold-dark">
              {highlight}
            </p>
          </div>
        )}
      </CardItalian>
    </div>
  );
};

export default CardItalian;