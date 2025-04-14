import { supabase } from '@utils/supabase'

const getUserLikedBooks = async (followedUsers: { followee: string }[]) => {
  const newArray = followedUsers.map(item => item.followee)
  const { data, error } = await supabase
    .from('user_likes_book')
    .select(`
      *,
      users ( * ),
      books ( * )
    `).in('user_id', newArray)
  if (error) throw new Error(error.message)
  return data
}

const getUserReviewedBooks = async () => {
  const { data, error } = await supabase
    .from('user_reviews_book')
    .select(`
      *,
      users ( * ),
      books ( * )
    `)
  if (error) throw new Error(error.message)
  return data
}

const getPublishedBooks = async (followedCreatorsIds: { creator_id: string}[]) => {
  const newArray = followedCreatorsIds.map(item => item.creator_id)
  const { data, error } = await supabase
    .from('creator_books')
    .select(`
      *,
      creators ( * ),
      books ( * )
    `)
    .in('creator_id', newArray)
  if (error) throw new Error(error.message)
  return data
}

export { 
  getUserLikedBooks,
  getUserReviewedBooks,
  getPublishedBooks
}