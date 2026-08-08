/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ABTalks black / orange identity
        ink: '#0A0A0A',
        coal: '#111111',
        graphite: '#171717',
        surface: '#141414',
        line: '#242424',
        'line-soft': '#1C1C1C',
        smoke: '#9A9A9A',
        ash: '#636363',
        orange: {
          DEFAULT: '#FF5A00',
          soft: '#FF7A2B',
          deep: '#E84E00',
          ink: '#2A1205',
        },
        bronze: {
          DEFAULT: '#C9823B',
          soft: '#E0A563',
          deep: '#8A5520',
        },
        silver: {
          DEFAULT: '#B9C0CA',
          soft: '#E3E7ED',
          deep: '#6E7480',
        },
        gold: {
          DEFAULT: '#F0B429',
          soft: '#FFD666',
          deep: '#9A6B00',
        },
        diamond: {
          DEFAULT: '#DFF1FF',
          soft: '#FFFFFF',
          deep: '#7FB6E5',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
        xl4: '2rem',
      },
      boxShadow: {
        'glow-orange': '0 0 0 1px rgba(255,90,0,0.35), 0 8px 30px -6px rgba(255,90,0,0.45)',
        'glow-orange-sm': '0 0 18px -4px rgba(255,90,0,0.55)',
        card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 10px 30px -18px rgba(0,0,0,0.9)',
        'streak-orb': '0 0 60px -12px rgba(255,90,0,0.55)',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.08em' }],
        'hero': ['2.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        content: '1200px',
        mobile: '480px',
      },
    },
  },
  plugins: [],
}
