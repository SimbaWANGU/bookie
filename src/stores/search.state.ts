import { atom } from 'jotai'

type SearchOptionProps = 'users' | 'authors' | 'books' | 'pages'

const searchTermAtom = atom('')
const searchOptionsAtom = atom<SearchOptionProps>('authors')

export {
  searchTermAtom,
  searchOptionsAtom,
  type SearchOptionProps
}