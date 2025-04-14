import { supabase } from '@utils/supabase'

interface LikeBook {
  user_id: string
  book_id: string
}

const checkLikeExists = async ({ user_id, book_id }: LikeBook) => {
  const { data, error } = await supabase
    .from('user_likes_book')
    .select('*')
    .eq('user_id', user_id)
    .eq('book_id', book_id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const likeBook = async ({ user_id, book_id }: LikeBook) => {
  const { data, error } = await supabase.from('user_likes_book').insert({
    user_id, book_id
  }).select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}

const unlikeBook = async ({ user_id, book_id }: LikeBook) => {
  const { data, error } = await supabase
    .from('user_likes_book')
    .delete()
    .eq('user_id', user_id)
    .eq('book_id', book_id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export {
  LikeBook,
  checkLikeExists,
  likeBook,
  unlikeBook
}