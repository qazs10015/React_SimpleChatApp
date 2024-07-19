/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#393e96',
        'secondary': '#8a3df8',
        'accent': '#ffc107',
        'neutral': '#f5f5f5',
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3',
      },
    },
  },
  plugins: [],
}