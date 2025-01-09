import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: {
    files: [
      './**/*.vue',
    ]
  },
  theme: {
    extend: {
      container: {
        center: true
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

