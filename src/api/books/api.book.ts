// api/booksApi.ts
import { supabase } from '@utils/supabase'

interface FetchBook {
  synopsis: string | string[]
}

interface FetchAudioBook {
  audio: string | string[]
}

const fetchBook = async ({ synopsis }: FetchBook) => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      book_genres (
        genres (name)
      ),
      creator_books (
        creators (name, id)
      ),
      story_paragraphs_count: story_paragraphs(count)
    `)
    .eq('id', synopsis)
    .eq('is_audio', false)
    .single()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

const fetchAudioBook = async ({ audio }: FetchAudioBook) => {
  const { data, error } = await supabase.from('books').select(
    `*,
    book_genres (
      genres (name)
    ),
    creator_books (
      creators (name, id)
    ),
    audio_books (
      *
    )
  `).eq('id', audio).single()

  if (error) {
    throw new Error(error.message)
  }
  return data
}


export {
  fetchBook,
  fetchAudioBook
}
