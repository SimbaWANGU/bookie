import { atom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FIRST_TIME_ON_APP_KEY = 'firstTimeOnApp'

// this is _your_ atom
export const firstTimeOnApp = atom<boolean>(true)

firstTimeOnApp.onMount = (setAtom) => {
  AsyncStorage.getItem(FIRST_TIME_ON_APP_KEY).then((v) => {
    if (v !== null) setAtom(v === 'true')
  })
}

export const firstTimeOnAppAtom = atom(
  (get) => get(firstTimeOnApp),
  (_, set, next: boolean) => {
    set(firstTimeOnApp, next)
    AsyncStorage.setItem(FIRST_TIME_ON_APP_KEY, next.toString())
  }
)