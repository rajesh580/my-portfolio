/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/context/ThemeContext.js" // Tell Tailwind to scan our context file
  ],
  
  // 1. Tell Tailwind to use the 'theme-...' classes
  // We set 'class' to enable dark mode, but our variable system
  // will handle all 5 themes.
  darkMode: 'class', 
  
  theme: {
    extend: {
      // 2. Register custom fonts (make sure to link them in public/index.html)
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },

      // 3. THIS IS THE CRITICAL FIX:
      // Teach Tailwind to use our CSS variables for its colors.
      // Now, when you use "bg-background", Tailwind will generate:
      // background-color: hsl(var(--color-background));
      colors: {
        'primary': 'hsl(var(--color-primary))',
        'primary-accent': 'hsl(var(--color-primary-accent))',
        'text': 'hsl(var(--color-text))',
        'text-muted': 'hsl(var(--color-text-muted))',
        'background': 'hsl(var(--color-background))',
        'surface': 'hsl(var(--color-surface))',
      }
    },
  },
  plugins: [],
};