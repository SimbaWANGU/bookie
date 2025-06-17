import { atom } from 'jotai'

type SearchOptionProps = 'users' | 'authors' | 'books' | 'pages' | ''

const searchTermAtom = atom('')
const clubSearchTermAtom = atom('')
const searchOptionsAtom = atom<SearchOptionProps>('')

export {
  searchTermAtom,
  clubSearchTermAtom,
  searchOptionsAtom,
  type SearchOptionProps
}