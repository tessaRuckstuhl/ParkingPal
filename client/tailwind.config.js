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
      lighterGray: '#E5E7EB',
      black: '#000000',
      purple: '#6F11F2',
    },
    borderWidth: {
      DEFAULT: '.5px',
    },

    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'bar': '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(31, 41, 55, 0.1);'
      },
    },
  },
  plugins: [],
};
