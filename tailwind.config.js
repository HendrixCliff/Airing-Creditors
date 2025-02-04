/** @type {import('tailwindcss').Config} */


export default {
    darkMode: ['class'],
    content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto'
    },
  	extend: {
      backgroundImage: {
        'dashboard-bg': "url('/images/speedrecharge.webp')",
        'payment-bg': "url('/images/tiger-fur.webp')",
      },

  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
