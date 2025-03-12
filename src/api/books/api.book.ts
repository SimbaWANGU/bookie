// api/booksApi.ts
import { supabase } from '@utils/supabase'

interface FetchBook {
  synopsis: string | string[]
}

export const fetchBook = async ({ synopsis }: FetchBook) => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      book_genres (
        genres (name)
      ),
      creator_books (
        creators (name)
      ),
      story_paragraphs!inner (
        id,
        paragraph_no,
        content
      )
    `)
    .eq('id', synopsis as string)
    .eq('story_paragraphs.paragraph_no', 1) // Fetch only paragraph_no = 1
    .single();

  if (error) {
    throw new Error(error.message)
  }
  return data
}
