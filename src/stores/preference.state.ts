import { atom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BOOK_PREFERENCES_KEY = 'bookPreferences'

export const bookPreferencesBaseAtom = atom<string[]>([])

bookPreferencesBaseAtom.onMount = (setAtom) => {
  AsyncStorage.getItem(BOOK_PREFERENCES_KEY).then((value) => {
    if (value !== null) {
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) setAtom(parsed)
      } catch (e) {
        console.warn('Failed to parse stored book preferences', e)
      }
    }
  })
}

export const bookPreferencesAtom = atom(
  (get) => get(bookPreferencesBaseAtom),
  (_, set, newPreferences: string[]) => {
    set(bookPreferencesBaseAtom, newPreferences)
    AsyncStorage.setItem(BOOK_PREFERENCES_KEY, JSON.stringify(newPreferences))
  }
)