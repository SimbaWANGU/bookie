import { PAGE_SIZE } from "@constants/Variables"
import { supabase } from "@utils/supabase"

const searchApi = async ({ pageParam = 0, searchOption, searchTerm, userId }) => {
  const from = pageParam * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  if (searchOption === 'authors') {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .ilike('alias', `%${searchTerm}%`)
      .range(from, to)
    if (error) throw error
    return data
  }

  if (searchOption === 'books') {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        book_genres (
          genres (name)
        ),
        creator_books (
          creators (name)
        )
      `)
      .eq('is_audio', false)
      .ilike('title', `%${searchTerm}%`)
      .range(from, to)
    if (error) throw error
    return data
  }

  if (searchOption === 'pages') {
    const { data, error } = await supabase
      .from('story_paragraphs')
      .select(`
        id,
        paragraph_no,
        created_at,
        content,
        book_id,
        books (
          title,
          id,
          cover_image_url
        )
        `)
      .ilike('content', `%${searchTerm}%`)
      .range(from, to)
    if (error) throw error
    return data
  }

  if (searchOption === 'users') {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`user_name.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`)
      .neq('id', userId)
      .range(from, to)

    if (error) throw error
    return data
  }

  return []
}

export {
  searchApi
}