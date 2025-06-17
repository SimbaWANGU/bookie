import { atom } from 'jotai'

const lastPageProgressAtom = atom(0)
const timeTakenInBookAtom = atom(0)
const readingStatusAtom = atom<'UPDATED' | 'COMPLETED'>('UPDATED')
const progressAtom = atom({
  paragraph_id: '',
  paragraph_no: 0
})

export {
  lastPageProgressAtom,
  timeTakenInBookAtom,
  readingStatusAtom,
  progressAtom
}