/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F5F3F1',
          100: '#E8E3DE',
          200: '#C9C0B6',
          300: '#A89C8D',
          400: '#7D6F60',
          500: '#524539',
          600: '#3A2F26',
          700: '#2A221B',
          800: '#1A1613',
          900: '#100D0B',
          DEFAULT: '#1A1613',
        },
        bone: {
          100: '#FFFFFF',
          200: '#F8F5EF',
          300: '#EFEAE0',
          DEFAULT: '#F8F5EF',
        },
        brass: {
          50: '#F7F0E3',
          100: '#EEDFC3',
          400: '#C4A063',
          500: '#AD8A4E',
          600: '#8B6D3B',
          700: '#6B5330',
          DEFAULT: '#AD8A4E',
        },
        wine: {
          50: '#F5E7EA',
          500: '#6B2737',
          600: '#521E2A',
          700: '#3E1620',
          DEFAULT: '#6B2737',
        },
        sage: {
          50: '#EEF0E8',
          100: '#DCE1D2',
          500: '#707D5C',
          600: '#5A6449',
          DEFAULT: '#707D5C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
};
