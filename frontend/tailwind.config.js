const breakpoints = {
  'xs': { 'max': '639px' }, // phone
  'sm': { 'min': '640px', 'max': '767px' }, // phone landscape
  'md': { 'min': '768px', 'max': '1023px' }, // ipad
  'lg': { 'min': '1024px', 'max': '1279px' }, // ipad landscape, ipad pro
  'xl': { 'min': '1280px', 'max': '1535px' }, // ipad pro landscape, laptop
  '2xl': { 'min': '1536px' }, // large monitor
};

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      default: ['Source Sans Pro', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      heading: ['Marck Script', 'Bradley Hand', 'Brush Script MT', 'Comic Sans MS', 'cursive'],
    },
    colors: {
      // font color
      light: '#F4F4F4',
      dark: '#182322',
      link: '#53B5BB',
      error: '#E74C3C',
      transparent: 'transparent',
      // branding colors
      primary: '#EEBB2E',
      background: {
        1: '#F9E4F0',
        2: '#E7F0F0',
      },
      gray: {
        DEFAULT: '#E9E9E9',
        darken: '#4D4D4D',
      },
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'screen-1/4': '25vh',
      'screen-1/2': '55vh',
      'screen-3/4': '75vh',
      'screen': '100vh',
    },
    screens: {
      ...breakpoints,
      'sm-below': { 'max': breakpoints.sm.max },
      'md-below': { 'max': breakpoints.md.max },
      'md-above': { 'min': breakpoints.md.min },
      'lg-above': { 'min': breakpoints.lg.min },
      'xl-above': { 'min': breakpoints.xl.min },
      'portrait': { 'raw': '(orientation: portrait)' },
      'landscape': { 'raw': '(orientation: landscape)' },
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
       },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
    },
  },
  plugins: [],
};
