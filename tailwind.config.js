import plugin from 'tailwindcss/plugin'

export const theme = {
  extend: {
    colors: {
      accent: '#198D9E',
      accentlight: '#645b67', // example accent color
      accentdark: '#211425',
      hint: '#D9C2C6',
      sup: '#A8A0B2',
      light: '#F3F4F6', // example background color
      lightheader: '#c1c5cB',
      dark: '#131416', // example background color
      darkheader: '#1E2022'
    },
  },
}
export const plugins = [
  plugin(({ addUtilities }) => {
    addUtilities({
      // 😎 similar to `@apply`
      '.bg-primary-color': 'light:bg-light dark:bg-dark',
      '.bg-background-color': 'light:bg-light/20 dark:bg-dark',
      '.back-icon': 'light:text-dark dark:text-light ios:text-xl android:text-2xl',
      '.card': 'bg-white dark:bg-black dark:opacity-80 rounded-lg shadow self-center',
      '.btn-primary': 'w-3/4 py-4 rounded-lg justify-center items-center shadow-lg my-4',
      '.title-one': 'text-lg font-bold text-gray-800 dark:text-light dark:opacity-90',
      '.title-two': 'text-lg mb-2 text-gray-500 dark:text-light/90 font-semibold',
      '.text-primary': 'text-sm text-gray-500 dark:text-light dark:opacity-80',
      '.body-text': 'font-serif leading-relaxed tracking-wide text-gray-800',
    })
  }),
]