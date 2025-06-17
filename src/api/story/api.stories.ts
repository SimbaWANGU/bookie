// api/booksApi.ts
import { supabase } from '@utils/supabase'

const fetchStory = async (pageParam: number, synopsis: string) => {
  const { data, error } = await supabase
    .from('story_paragraphs')
    .select('*')
    .eq('book_id', synopsis)
    .range(pageParam, pageParam + 9)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const getCurrentPosition = async (bookId: string) => {
  const { data, error } = await supabase.from('story_paragraphs').select('id').eq('book_id', bookId).eq('paragraph_no', 1)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export {
  fetchStory,
  getCurrentPosition
}