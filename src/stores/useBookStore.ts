import { Book } from '@models/book.type'
import { Story } from '@models/story.type'
import { create } from 'zustand'

type BookState = {
  books: Book[]
  setBooks: (books: Book[]) => void
  timer: number
  setTimer: (timer: number) => void
  story: Story
  setStory: (story: Story) => void
  search: string
  setSearch: (search: string) => void
  genres: string[]
  setGenres: (genre: string[]) => void
  filteredGenre: string
  setFilteredGenre: (filteredGenre: string) => void
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  setBooks: (books: Book[]) => set({ books }),
  timer: 0,
  setTimer: (timer: number) => set({ timer }),
  story: {} as Story,
  setStory: (story: Story) => set({ story }),
  search: '',
  setSearch: (search: string) => set({ search }),
  genres: [],
  setGenres: (genres: string[]) => set({ genres }),
  filteredGenre: '',
  setFilteredGenre: (filteredGenre: string) => set({ filteredGenre }),
}))