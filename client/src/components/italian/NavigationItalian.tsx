import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

interface NavigationItalianProps {
  logo?: React.ReactNode;
  items: NavigationItem[];
  cta?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  sticky?: boolean;
}

export const NavigationItalian: React.FC<NavigationItalianProps> = ({
  logo,
  items,
  cta,
  className,
  variant = 'default',
  sticky = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (sticky) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky]);

  const baseClasses = cn(
    "z-50 transition-all duration-300",
    sticky && (isScrolled
      ? "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-roman-marble/30"
      : "relative bg-transparent"
    )
  );

  const variantClasses = {
    default: "italian-nav",
    centered: "italian-nav-centered",
    split: "italian-nav-split",
    minimal: "italian-nav border-b border-milanese-silver/20"
  };

  return (
    <nav className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="italian-container">
        {/* Logo Section */}
        <div className="flex items-center">
          {logo && (
            <div className="transition-transform duration-300 hover:scale-105">
              {logo}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "italian-nav-text relative py-2 transition-colors duration-300",
                  item.active
                    ? "text-italian-green"
                    : "text-neutral-600 hover:text-italian-green"
                )}
              >
                {item.label}

                {/* Badge */}
                {item.badge && (
                  <span className="absolute -top-1 -right-3 px-1.5 py-0.5 bg-tuscan-terracotta text-white text-xs rounded-full min-w-[16px] text-center">
                    {item.badge}
                  </span>
                )}

                {/* Underline animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-italian-green transform scale-x-0 transition-transform duration-300 origin-left",
                  item.active && "scale-x-100"
                )} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          {cta && (
            <Button
              onClick={cta.onClick}
              className="italian-button bg-italian-green hover:bg-italian-green-dark text-white px-6 py-2 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-italian-glow"
            >
              {cta.label}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-neutral-600 hover:text-italian-green transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-center">
            <span className={cn(
              "absolute h-0.5 w-6 bg-current transform transition-all duration-300",
              mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            )} />
            <span className={cn(
              "h-0.5 w-6 bg-current transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "absolute h-0.5 w-6 bg-current transform transition-all duration-300",
              mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            )} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-white border-b border-roman-marble/30 transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-96" : "max-h-0"
      )}>
        <div className="italian-container py-4">
          <div className="flex flex-col space-y-4">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "italian-nav-text py-2 transition-colors duration-300",
                  item.active
                    ? "text-italian-green"
                    : "text-neutral-600 hover:text-italian-green"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-tuscan-terracotta text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}

            {/* Mobile CTA */}
            {cta && (
              <Button
                onClick={cta.onClick}
                className="italian-button bg-italian-green hover:bg-italian-green-dark text-white px-6 py-3 rounded-md transition-all duration-300 w-full mt-4"
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Italian decorative element */}
      {(variant === 'default' || variant === 'centered') && (
        <div className="absolute bottom-0 left-0 right-0 h-px gradient-italian-elegance opacity-20" />
      )}
    </nav>
  );
};

// Split Navigation with logo in center
export const NavigationItalianSplit: React.FC<NavigationItalianProps & {
  leftItems?: NavigationItem[];
  rightItems?: NavigationItem[];
}> = ({ logo, items, leftItems, rightItems, cta, ...props }) => {
  const allLeftItems = leftItems || items?.slice(0, Math.ceil(items.length / 2)) || [];
  const allRightItems = rightItems || items?.slice(Math.ceil(items.length / 2)) || [];

  return (
    <NavigationItalian
      variant="split"
      logo={
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {logo}
            {/* Italian decorative circle */}
            <div className="absolute -inset-4 border-2 border-italian-green/20 rounded-full animate-italian-pulse" />
          </div>
        </div>
      }
      items={allLeftItems}
      cta={
        <div className="flex items-center space-x-4">
          {allRightItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "italian-nav-text py-2 transition-colors duration-300",
                item.active
                  ? "text-italian-green"
                  : "text-neutral-600 hover:text-italian-green"
              )}
            >
              {item.label}
            </a>
          ))}
          {cta && (
            <Button
              onClick={cta.onClick}
              className="italian-button bg-italian-green hover:bg-italian-green-dark text-white px-6 py-2 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-italian-glow"
            >
              {cta.label}
            </Button>
          )}
        </div>
      }
      {...props}
    />
  );
};

// Minimal Navigation for clean aesthetic
export const NavigationItalianMinimal: React.FC<NavigationItalianProps> = (props) => {
  return (
    <NavigationItalian
      variant="minimal"
      sticky={false}
      {...props}
    />
  );
};

export default NavigationItalian;