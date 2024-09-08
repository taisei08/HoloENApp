/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': `${process.env.NEXT_PUBLIC_MAX_WIDTH}px`
      },
      width: {
        'custom': `${process.env.NEXT_PUBLIC_MAX_WIDTH}px`
      },
    }
  },
  daisyui: {
    themes: ["bumblebee", "dracula", "emerald"],
  },
  plugins: [
    require('daisyui'),
  ],
}

