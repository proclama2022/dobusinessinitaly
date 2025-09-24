/**
 * Responsive utilities for YourBusinessInItaly
 *
 * This file contains hooks and utilities for responsive behavior
 * that complement the CSS responsive system.
 */

import { useState, useEffect } from 'react';

// Breakpoint definitions matching the CSS
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1320,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Device type definitions
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to get current window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Hook to check if current viewport matches a breakpoint
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const { width } = useWindowSize();
  return width >= BREAKPOINTS[breakpoint];
}

/**
 * Hook to get current device type
 */
export function useDeviceType(): DeviceType {
  const { width } = useWindowSize();

  if (width < BREAKPOINTS.md) {
    return 'mobile';
  } else if (width < BREAKPOINTS.lg) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Hook to get current breakpoint
 */
export function useCurrentBreakpoint(): Breakpoint {
  const { width } = useWindowSize();

  // Find the largest breakpoint that fits
  const breakpoints = Object.entries(BREAKPOINTS)
    .sort(([, a], [, b]) => b - a) as [Breakpoint, number][];

  for (const [name, size] of breakpoints) {
    if (width >= size) {
      return name;
    }
  }

  return 'xs'; // Smallest breakpoint
}

/**
 * Hook to get responsive values based on device type
 */
export function useResponsiveValue<T>(values: Partial<Record<DeviceType, T>>): T | undefined {
  const deviceType = useDeviceType();
  return values[deviceType];
}

/**
 * Hook to get responsive values based on breakpoint
 */
export function useBreakpointValue<T>(values: Partial<Record<Breakpoint, T>>): T | undefined {
  const currentBreakpoint = useCurrentBreakpoint();

  // Find the largest breakpoint that has a value and is smaller or equal to current
  const breakpoints = Object.entries(BREAKPOINTS)
    .sort(([, a], [, b]) => b - a) as [Breakpoint, number][];

  for (const [name] of breakpoints) {
    if (values[name] && BREAKPOINTS[name] <= BREAKPOINTS[currentBreakpoint]) {
      return values[name];
    }
  }

  return undefined;
}

/**
 * Hook to check if device is mobile
 */
export function useIsMobile(): boolean {
  return useDeviceType() === 'mobile';
}

/**
 * Hook to check if device is tablet
 */
export function useIsTablet(): boolean {
  return useDeviceType() === 'tablet';
}

/**
 * Hook to check if device is desktop
 */
export function useIsDesktop(): boolean {
  return useDeviceType() === 'desktop';
}

/**
 * Hook to check if device is in landscape orientation
 */
export function useIsLandscape(): boolean {
  const { width, height } = useWindowSize();
  return width > height;
}

/**
 * Hook to check if device is in portrait orientation
 */
export function useIsPortrait(): boolean {
  return !useIsLandscape();
}

/**
 * Hook to get viewport height considering mobile browsers
 */
export function useViewportHeight(): number {
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Handle mobile browser viewport height changes
    const handleOrientationChange = () => {
      setTimeout(handleResize, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return viewportHeight;
}

/**
 * Hook to get safe area insets for mobile devices with notches
 */
export function useSafeAreaInsets() {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    // Get CSS custom properties for safe area insets
    const style = getComputedStyle(document.documentElement);

    setInsets({
      top: parseInt(style.getPropertyValue('--sat') || '0', 10),
      right: parseInt(style.getPropertyValue('--sar') || '0', 10),
      bottom: parseInt(style.getPropertyValue('--sab') || '0', 10),
      left: parseInt(style.getPropertyValue('--sal') || '0', 10),
    });
  }, []);

  return insets;
}

/**
 * Hook to detect touch device
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouch();
  }, []);

  return isTouch;
}

/**
 * Hook to get responsive image sizes
 */
export function useResponsiveImageSizes(
  defaultSize: string = '100vw',
  breakpointSizes?: Partial<Record<Breakpoint, string>>
): string {
  const { width } = useWindowSize();

  if (!breakpointSizes) {
    return defaultSize;
  }

  // Build sizes string based on current viewport
  const sizes = Object.entries(breakpointSizes)
    .sort(([, a], [, b]) => BREAKPOINTS[a as Breakpoint] - BREAKPOINTS[b as Breakpoint])
    .map(([breakpoint, size]) => `(min-width: ${BREAKPOINTS[breakpoint as Breakpoint]}px) ${size}`)
    .reverse();

  sizes.push(defaultSize);

  return sizes.join(', ');
}

/**
 * Hook to get optimal font size based on viewport
 */
export function useResponsiveFontSize(
  mobileSize: number,
  tabletSize?: number,
  desktopSize?: number
): number {
  const { width } = useWindowSize();

  if (width >= BREAKPOINTS.lg && desktopSize) {
    return desktopSize;
  } else if (width >= BREAKPOINTS.md && tabletSize) {
    return tabletSize;
  }

  return mobileSize;
}

/**
 * Hook to debounce resize events
 */
export function useDebouncedResize(delay: number = 250) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, delay);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return windowSize;
}

/**
 * Hook to check if element is in viewport
 */
export function useIsInViewport(elementRef: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isInViewport;
}

/**
 * Utility functions for responsive calculations
 */
export const responsiveUtils = {
  /**
   * Calculate responsive padding/margin based on viewport width
   */
  calculateSpacing: (baseSpacing: number, viewportWidth: number): number => {
    const ratio = viewportWidth / BREAKPOINTS.lg;
    return Math.max(baseSpacing * Math.min(ratio, 1), baseSpacing * 0.5);
  },

  /**
   * Calculate responsive font size based on viewport width
   */
  calculateFontSize: (baseSize: number, viewportWidth: number): number => {
    const ratio = viewportWidth / BREAKPOINTS.lg;
    return Math.max(baseSize * Math.min(ratio, 1.2), baseSize * 0.8);
  },

  /**
   * Get optimal number of columns for grid based on viewport width
   */
  getOptimalColumns: (viewportWidth: number, minColumnWidth: number = 300): number => {
    return Math.max(1, Math.floor(viewportWidth / minColumnWidth));
  },

  /**
   * Calculate aspect ratio preserving dimensions
   */
  calculateAspectRatio: (
    width: number,
    aspectRatio: number = 16 / 9
  ): { width: number; height: number } => {
    return {
      width,
      height: width / aspectRatio,
    };
  },

  /**
   * Get image srcset for responsive images
   */
  generateSrcset: (
    baseUrl: string,
    widths: number[] = [400, 600, 800, 1000, 1200]
  ): string => {
    return widths
      .map(width => `${baseUrl}?w=${width} ${width}w`)
      .join(', ');
  },
};

export default {
  useWindowSize,
  useBreakpoint,
  useDeviceType,
  useCurrentBreakpoint,
  useResponsiveValue,
  useBreakpointValue,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLandscape,
  useIsPortrait,
  useViewportHeight,
  useSafeAreaInsets,
  useIsTouchDevice,
  useResponsiveImageSizes,
  useResponsiveFontSize,
  useDebouncedResize,
  useIsInViewport,
  responsiveUtils,
};