/**
 * Tests for responsive utilities
 */

import {
  responsiveUtils,
  BREAKPOINTS,
} from '../responsive';

describe('Responsive Utilities', () => {
  describe('calculateSpacing', () => {
    it('should calculate spacing based on viewport width', () => {
      const mobileSpacing = responsiveUtils.calculateSpacing(16, 375);
      const desktopSpacing = responsiveUtils.calculateSpacing(16, 1200);

      expect(mobileSpacing).toBeLessThan(desktopSpacing);
      expect(mobileSpacing).toBe(8); // 16 * 0.5 minimum
      expect(desktopSpacing).toBe(16); // 16 * 1 maximum
    });

    it('should not exceed minimum spacing', () => {
      const spacing = responsiveUtils.calculateSpacing(16, 200);
      expect(spacing).toBe(8);
    });

    it('should not exceed maximum spacing', () => {
      const spacing = responsiveUtils.calculateSpacing(16, 2000);
      expect(spacing).toBe(19.2); // 16 * 1.2 maximum
    });
  });

  describe('calculateFontSize', () => {
    it('should calculate font size based on viewport width', () => {
      const mobileFont = responsiveUtils.calculateFontSize(16, 375);
      const desktopFont = responsiveUtils.calculateFontSize(16, 1200);

      expect(mobileFont).toBeLessThan(desktopFont);
      expect(mobileFont).toBe(12.8); // 16 * 0.8 minimum
      expect(desktopFont).toBe(19.2); // 16 * 1.2 maximum
    });
  });

  describe('getOptimalColumns', () => {
    it('should return 1 column for narrow viewports', () => {
      const columns = responsiveUtils.getOptimalColumns(300, 300);
      expect(columns).toBe(1);
    });

    it('should calculate optimal columns based on viewport width', () => {
      const columns1 = responsiveUtils.getOptimalColumns(600, 300);
      const columns2 = responsiveUtils.getOptimalColumns(900, 300);
      const columns3 = responsiveUtils.getOptimalColumns(1200, 300);

      expect(columns1).toBe(2);
      expect(columns2).toBe(3);
      expect(columns3).toBe(4);
    });

    it('should respect minimum column width', () => {
      const columns = responsiveUtils.getOptimalColumns(800, 400);
      expect(columns).toBe(2);
    });
  });

  describe('calculateAspectRatio', () => {
    it('should calculate correct height for 16:9 aspect ratio', () => {
      const result = responsiveUtils.calculateAspectRatio(1600, 16 / 9);
      expect(result.width).toBe(1600);
      expect(result.height).toBe(900);
    });

    it('should calculate correct height for 1:1 aspect ratio', () => {
      const result = responsiveUtils.calculateAspectRatio(500, 1);
      expect(result.width).toBe(500);
      expect(result.height).toBe(500);
    });

    it('should calculate correct height for 4:3 aspect ratio', () => {
      const result = responsiveUtils.calculateAspectRatio(800, 4 / 3);
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
    });
  });

  describe('generateSrcset', () => {
    it('should generate correct srcset string', () => {
      const srcset = responsiveUtils.generateSrcset('https://example.com/image.jpg', [400, 800, 1200]);
      expect(srcset).toBe(
        'https://example.com/image.jpg?w=400 400w, ' +
        'https://example.com/image.jpg?w=800 800w, ' +
        'https://example.com/image.jpg?w=1200 1200w'
      );
    });

    it('should use default widths if not provided', () => {
      const srcset = responsiveUtils.generateSrcset('https://example.com/image.jpg');
      expect(srcset).toContain('400w');
      expect(srcset).toContain('600w');
      expect(srcset).toContain('800w');
      expect(srcset).toContain('1000w');
      expect(srcset).toContain('1200w');
    });
  });
});

describe('BREAKPOINTS', () => {
  it('should have correct breakpoint values', () => {
    expect(BREAKPOINTS.xs).toBe(475);
    expect(BREAKPOINTS.sm).toBe(640);
    expect(BREAKPOINTS.md).toBe(768);
    expect(BREAKPOINTS.lg).toBe(1024);
    expect(BREAKPOINTS.xl).toBe(1280);
    expect(BREAKPOINTS['2xl']).toBe(1320);
  });

  it('should have breakpoints in ascending order', () => {
    const values = Object.values(BREAKPOINTS);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });
});

// Mock window object for tests
const mockWindow = (width: number, height: number = 800) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

// Mock IntersectionObserver
const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  global.IntersectionObserver = mockIntersectionObserver;
};

// Setup tests
beforeEach(() => {
  mockWindow(1024);
  mockIntersectionObserver();
  jest.clearAllMocks();
});

// Mock CSS custom properties
Object.defineProperty(document.documentElement, 'style', {
  get() {
    return {
      getPropertyValue: jest.fn((prop: string) => {
        const mockValues: Record<string, string> = {
          '--sat': '0',
          '--sar': '0',
          '--sab': '0',
          '--sal': '0',
        };
        return mockValues[prop] || '';
      }),
    };
  },
});