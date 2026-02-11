import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: {
        xs: "475px", // Extra small phones
        sm: "640px", // Small phones
        md: "768px", // Tablets
        lg: "1024px", // Small desktops
        xl: "1280px", // Desktops
        "2xl": "1320px", // Large desktops
        "3xl": "1600px", // Extra large desktops
      },
    },
    extend: {
      fontFamily: {
        // Anti-Slop Font System - Distinctive & Human
        'display': ['Playfair Display', 'Georgia', 'serif'],        // Editorial luxury for H1
        'headline': ['Syne', 'system-ui', 'sans-serif'],           // Bold geometric for H2-H3
        'body': ['Source Serif 4', 'Georgia', 'serif'],             // Readable for paragraphs
        'accent': ['Cormorant', 'Georgia', 'serif'],                // Elegant Italian accents
        'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
        // Legacy aliases (transitioning)
        'outfit': ['Syne', 'system-ui', 'sans-serif'],              // Outfit → Syne
        'instrument': ['Playfair Display', 'Georgia', 'serif'],     // Keep compatibility
        'sans': ['Syne', 'system-ui', 'sans-serif'],                // Default sans → Syne
        'serif': ['Source Serif 4', 'Georgia', 'serif'],            // Default serif → Source Serif
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#334155', // Slate 700
            maxWidth: '68ch',
            fontFamily: '"Inter", sans-serif',
            a: {
              color: '#009246', // Italian Green
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#007036',
                borderBottomColor: '#007036'
              },
            },
            h1: {
              color: '#0f172a',
              fontWeight: '700',
              fontFamily: '"Montserrat", sans-serif',
              letterSpacing: '-0.02em',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '600',
              fontFamily: '"Montserrat", sans-serif',
              marginTop: '2em',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '600',
              fontFamily: '"Montserrat", sans-serif',
            },
            p: {
              color: '#475569',
              lineHeight: '1.8',
              fontSize: '1rem',
            },
            li: { color: '#475569' },
            blockquote: {
              color: '#334155',
              fontStyle: 'italic',
              borderLeftColor: '#009246', // Green accent
              backgroundColor: '#f8fafc',
              padding: '1rem 1.5rem',
            },
            strong: { color: '#0f172a', fontWeight: '600' },
          },
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      colors: {
        'italian-green': {
          DEFAULT: '#004225', // Racing Green (Premium, Darker)
          bright: '#009246',  // Original Flag Green (for accents)
          light: '#00b050',
          dark: '#002a17',
        },
        'cream': {
          DEFAULT: '#F9F7F2', // Warm background
          dark: '#E6E2D6',
        },
        'gold': {
          DEFAULT: '#D4AF37', // Luxury accents
          light: '#F4D06F',
        },
        'italian-red': {
          DEFAULT: '#ce2b37',
          light: '#e04d58',
          dark: '#9e1b25',
        },
        'navy': {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          dark: '#020617',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        neutral: {
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          800: "hsl(var(--neutral-800))",
          900: "hsl(var(--neutral-900))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
