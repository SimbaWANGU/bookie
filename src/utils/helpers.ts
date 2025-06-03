// TODO: Add helpers
export {}

// screenUtils.ts
import { Dimensions } from 'react-native'

type ScreenSizeCategory = 'small' | 'medium' | 'large'

const getScreenSizeCategory = (): ScreenSizeCategory => {
  const { height, width } = Dimensions.get('window')
  const screenArea = height * width
// 844 390
  console.log(height, width)

  if (screenArea < 850 * 390) return 'small'
  if (screenArea < 1100 * 500) return 'medium'
  return 'large'
}

export {
  getScreenSizeCategory
}
