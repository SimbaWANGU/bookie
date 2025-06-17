import { atom } from 'jotai'

type ActivityFilter = '' | 'authors' | 'likes' | 'reviewed'

const activityFilterAtom = atom<ActivityFilter>('') // '' = all

export {
  activityFilterAtom,
  type ActivityFilter
}