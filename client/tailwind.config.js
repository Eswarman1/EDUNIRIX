/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Assuming you want to keep dark mode functionality
  theme: {
    extend: {
      colors: {
        // Define the new Black, White, and Gold palette
        // Using descriptive names or shades for Tailwind utility classes
        'background-dark': '#121212', // A common dark charcoal/near black
        'background-light': '#FFFFFF', // Pure white

        'text-light': '#FFFFFF', // White text for dark backgrounds
        'text-dark': '#121212',  // Dark text for light backgrounds
        'text-muted': '#A0A0A0', // Light gray for secondary text

        'gold-accent': {
          DEFAULT: '#FFD700', // Standard Gold
          'light': '#FFFACD', // Lighter shade
          'dark': '#B8860B',  // Darker shade
          // Add more shades if needed, e.g., gold-50, gold-100...gold-900
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107', // DEFAULT
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
          950: '#BF5A00',
        },

        // Keep standard colors for semantic meanings (success, warning, danger)
        // These might not strictly fit the black/gold theme but are important for UI feedback
        success: {
           DEFAULT: '#228B22', // Forest Green
           50: '#f0fdf4',
           100: '#dcfce7',
           200: '#bbf7d0',
           300: '#86efac',
           400: '#4ade80',
           500: '#22c55e',
           600: '#16a34a',
           700: '#15803d',
           800: '#166534',
           900: '#14532d',
           950: '#0f3d23',
        },
         warning: {
           DEFAULT: '#FFD700', // Using Gold as the warning color for consistency
           50: '#fff7ed',
           100: '#ffedd5',
           200: '#fed7aa',
           300: '#fdba74',
           400: '#fbbf24',
           500: '#f59e0b',
           600: '#d97706',
           700: '#b45309',
           800: '#92400e',
           900: '#78350f',
           950: '#652f0e',
        },
         danger: {
           DEFAULT: '#DC143C', // Crimson
           50: '#fef2f2',
           100: '#fee2e2',
           200: '#fecaca',
           300: '#fca5a5',
           400: '#f87171',
           500: '#ef4444',
           600: '#dc2626',
           700: '#b91c1c',
           800: '#991b1b',
           900: '#7f1d1d',
           950: '#631515',
        },

        // Keep existing default colors if they are still used in gradients or elsewhere
        blue: { // Ensure default blues are still available for gradients
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
        },
         purple: { // Ensure default purples are still available for gradients
          50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
          500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
        },
         pink: { // Ensure default pinks are still available for gradients
          50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
          500: '#ec4899', 600: '#db2777', 700: '#be188d', 800: '#9d174d', 900: '#831843', 950: '#500724'
        },
         cyan: { // Ensure default cyans are still available for gradients
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
          500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
        },
         teal: { // Ensure default teals are still available for gradients
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
          500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
        },
         indigo: { // Ensure default indigos are still available
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5bbfb', 400: '#818cf8',
          500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
        },
          orange: { // Ensure default orange is still available
            50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
            500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407',
          },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}