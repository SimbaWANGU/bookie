// api/booksApi.ts
import { supabase } from '@utils/supabase'

export const fetchBooks = async () => {
  const { data, error } = await supabase.from('books').select(`
    *,
    book_genres (
      genres (name)
    ),
    creator_books (
      creators (name)
    )
  `)  
  if (error) {
    throw new Error(error.message)
  }
  return data
}

//? 1. endpoint for featured books
//? 2. endpoint for latest books