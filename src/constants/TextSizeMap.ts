// fontSizes.ts
type FontSizePreference = 'small' | 'medium' | 'large'
type ScreenSizeCategory = 'small' | 'medium' | 'large'

type TextSizeMap = {
  [key in ScreenSizeCategory]: {
    [key in FontSizePreference]: string
  }
}

const textSizeMap: TextSizeMap = {
  small: {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  },
  medium: {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
  },
  large: {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  },
}

export {
  textSizeMap
}