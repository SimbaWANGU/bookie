import { supabase } from '@utils/supabase'

const fetchReviews = async (book_id: string) => {
  const { data, error } = await supabase
    .from('user_reviews_book')
    .select(`
      *,
      users (
        *
      )
    `)
    .order('created_at', { ascending: false })
    .eq('book_id', book_id)

    if (error) {
      throw new Error(error.message)
    }
    return data
}

const createReview = async (user_id: string, book_id: string, review: string) => {
  const { data, error } = await supabase
  .from('user_reviews_book')
  .insert([
    {
      user_id,
      book_id,
      review
    },
  ])
  .select()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export {
  fetchReviews,
  createReview
}