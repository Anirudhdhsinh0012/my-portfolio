import React, { useState, useEffect } from 'react';

/**
 * ThemeToggle Component
 * 
 * A theme switcher that:
 * - Toggles between light and dark modes
 * - Syncs with localStorage for persistence
 * - Respects system preference (prefers-color-scheme)
 * - Smooth transitions
 * - Accessible keyboard navigation
 * 
 * Usage:
 * ```jsx
 * import ThemeToggle from './components/ThemeToggle';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <ThemeToggle />
 *       // ... rest of your app
 *     </div>
 *   );
 * }
 * ```
 */
const ThemeToggle = ({ className = '' }) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only apply system preference if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <button
        className={`theme-toggle-placeholder w-12 h-12 ${className}`}
        aria-label="Loading theme toggle"
        disabled
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle group relative w-12 h-12 sm:w-14 sm:h-14
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        rounded-full shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`absolute inset-0 m-auto w-6 h-6 sm:w-7 sm:h-7
          text-yellow-500 transition-all duration-500
          ${theme === 'dark' 
            ? 'opacity-0 rotate-90 scale-0' 
            : 'opacity-100 rotate-0 scale-100'
          }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`absolute inset-0 m-auto w-6 h-6 sm:w-7 sm:h-7
          text-blue-400 transition-all duration-500
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0'
          }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-full bg-blue-500 
        opacity-0 group-active:opacity-20 transition-opacity duration-200"
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeToggle;
