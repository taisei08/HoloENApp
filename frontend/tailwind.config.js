/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/page.tsx",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["bumblebee", "dracula", "cupcake"],
  },
  plugins: [
    require('daisyui'),
  ],
}

