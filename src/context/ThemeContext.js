import React, { createContext, useState, useContext, useEffect } from 'react';

// An array of all available theme names
export const themes = ['light', 'neon', 'dark', 'forest', 'synthwave'];

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  // 3. Effect to apply the theme to the <html> element
  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> tag
    
    // Robustly remove all theme classes
    root.classList.remove(...themes); 
    
    // Add only the current theme class
    root.classList.add(theme);

  }, [theme]); // Rerun this effect when the theme changes

  // 4. Provide the theme and the *setter* function
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Create a custom hook to use the context easily
export const useTheme = () => {
  return useContext(ThemeContext);
};