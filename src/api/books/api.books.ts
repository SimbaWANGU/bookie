// api/booksApi.ts
import { Book } from '@models/book.type'
import { supabase } from '@utils/supabase'

const featuredBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase.from('books').select(`
    *,
    book_genres (
      genres (name)
    ),
    creator_books (
      creators ( id, name, avatar_url )
    )
  `)
  .eq('is_audio', false)
  .eq('is_featured', true)
  
  if (error) {
    throw new Error(error.message)
  }

  return data
}

const fetchExploreBooks = async () => {
  const { data, error } = await supabase.from('books').select(`
    *,
    book_genres (
      genres (name)
    ),
    creator_books (
      creators (name)
    )
  `)
  .eq('is_audio', false)
  .order('trending_Score', { ascending: false })
  
  if (error) {
    throw new Error(error.message)
  }

  return data
}

const fetchBooks = async () => {
  const { data, error } = await supabase.from('books').select(`
    *,
    book_genres (
      genres (name)
    ),
    creator_books (
      creators (name)
    )
  `)
  .eq('is_audio', false)
  
  if (error) {
    throw new Error(error.message)
  }

  return data
}

export {
  featuredBooks,
  fetchExploreBooks,
  fetchBooks
}

//? 1. endpoint for featured books
//? 2. endpoint for latest books