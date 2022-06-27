module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      offWhite: '#F3F3F0',
      darkGray: '#3C3C3C',
      lightGray: '#6B7280',
      black: '#000000',
      purple: '#6F11F2',
    },
    borderWidth: {
      DEFAULT: '.5px',
    },

    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
