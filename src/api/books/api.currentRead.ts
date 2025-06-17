import { Book } from '@models/book.type'
import { supabase } from '@utils/supabase'

interface CurrentReadInterface {
  last_updated_at: string
  current_paragraph: number
  books: Book
}

const currentRead = async (id: string): Promise<CurrentReadInterface[]> => {
  const { data, error } = await supabase
    .from('user_reading_progress')
    .select(`
      last_updated_at,
      current_paragraph,
      books (
        *,
        story_paragraphs_count: story_paragraphs(count)
      )
    `)
    .order('last_updated_at', { ascending: false })
    .eq('user_id', id)
    .limit(1)

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as CurrentReadInterface[]
}

export { currentRead }