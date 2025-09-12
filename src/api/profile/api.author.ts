import { Author } from "@models/author.type"
import { supabase } from "@utils/supabase"

const fetchAuthor = async (id: string): Promise<Author> => {
  const { data, error } = await supabase.from('creators')
    .select(`
      *,
      books_count: creator_books(count),
      liked_count: creator_books( books ( user_likes_book (count)) )
    `)
    .eq('id', id)
    .single()
      
  if (error) {
    throw new Error(error.message)
  }
  return data as Author
}

export {
  fetchAuthor
}
