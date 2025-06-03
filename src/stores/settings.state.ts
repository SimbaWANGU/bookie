// atoms/pagerViewOrientationAtom.ts
import { atomWithStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create custom storage adapter
const asyncStorage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(value) : null
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key)
  },
}

const pagerViewOrientationAtom = atomWithStorage<'horizontal' | 'vertical'>('pagerViewOrientation', 'horizontal', asyncStorage)
const textSizeAtom = atomWithStorage<'small' | 'medium' | 'large'>('storyTextSize', 'medium', asyncStorage)
const timeFormatAtom = atomWithStorage<boolean>('timeFormat', true, asyncStorage)


export {
  pagerViewOrientationAtom,
  textSizeAtom,
  timeFormatAtom
}