import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { booksApi } from './books/api.books'
import { storiesApi } from './story/api.stories'
import { supabase } from '@utils/supabase'

export const bookKeys = createQueryKeyStore({
  book: {
    list: () => ({
      queryKey: ['all-books'],
      queryFn: supabase.from("books").select("*")
    })
  },
})

export const storyKeys = createQueryKeyStore({
  story: {
    instance: (id: string) => ({
      queryKey: ['story', id],
      queryFn: () => storiesApi.getStory(id),
    })
  },
})