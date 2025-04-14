import { atom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FIRST_TIME_ON_APP_KEY = 'firstTimeOnApp'

// Base atom with a default value of true
const baseFirstTimeOnAppAtom = atom<boolean>(true)

// On mount, load the persisted value from AsyncStorage.
baseFirstTimeOnAppAtom.onMount = (setAtom) => {
  AsyncStorage.getItem(FIRST_TIME_ON_APP_KEY).then((storedValue) => {
    if (storedValue !== null) {
      setAtom(storedValue === 'true')
    }
  })
}

// Derived atom for reading and writing that persists changes.
const firstTimeOnAppAtom = atom(
  (get) => get(baseFirstTimeOnAppAtom),
  (_, set, newValue: boolean) => {
    set(baseFirstTimeOnAppAtom, newValue)
    AsyncStorage.setItem(FIRST_TIME_ON_APP_KEY, newValue.toString())
  }
)

export {
  firstTimeOnAppAtom
}