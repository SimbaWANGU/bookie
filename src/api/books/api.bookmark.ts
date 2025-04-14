import { supabase } from '@utils/supabase'

interface BookmarkBook {
  user_id: string
  book_id: string
}

const checkBookmarkExists = async ({ user_id, book_id }: BookmarkBook) => {
  const { data, error } = await supabase.from('user_reading_list').select('*')
    .eq('user_id', user_id)
    .eq('book_id', book_id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

const bookmarkBook = async ({ user_id, book_id }: BookmarkBook) => {
  const { data, error } = await supabase
    .from('user_reading_list')
    .insert({ user_id, book_id })
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

const unbookmarkBook = async ({ user_id, book_id }: BookmarkBook) => {
  const { data, error } = await supabase
    .from('user_reading_list')
    .delete()
    .eq('user_id', user_id)
    .eq('book_id', book_id)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export {
  BookmarkBook,
  checkBookmarkExists,
  bookmarkBook,
  unbookmarkBook
}