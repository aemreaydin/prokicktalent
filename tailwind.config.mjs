/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // v2 editorial tokens (also available as CSS vars in global.css)
        paper: '#F4F1E9',
        ink: '#1A1813',
        gold: '#7C5E1C',
        data: '#2F6342',
        // legacy tokens kept for privacy/terms back-compat
        background: '#0A0A0A',
        surface: '#111827',
        bone: '#E9E5D8',
        signal: '#64D98A',
        green: '#22C55E',
      },
      fontFamily: {
        // v2 editorial
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // legacy aliases
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
