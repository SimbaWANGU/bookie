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

const getUserReviewedBooks = async (followedUsers: { followee: string }[]) => {
  const newArray = followedUsers.map(item => item.followee)
  const { data, error } = await supabase
    .from('user_reviews_book')
    .select(`
      *,
      users ( * ),
      books ( * )
    `).in('user_id', newArray)
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
      books (
        *,
        book_genres (
          genres ( name )
        )
      )
    `)
    .in('creator_id', newArray)

  if (error) throw new Error(error.message)
  return data
}

const getBooksByGenres = async (genreNames: string[]) => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      book_genres:book_genres!inner (
        genres:genres!inner (
          name
        )
      ),
      creator_books (
        creators ( * )
      )
    `)
    .eq('is_audio', false)
    .in('book_genres.genres.name', genreNames)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }

  return data;
};

const getOthersStartedReading = async (followedUsers: { followee: string }[]) => {
  const userIds = followedUsers.map(u => u.followee)

  const { data, error } = await supabase
    .from('user_reading_progress')
    .select(`
      *,
      books (
        *,
        creator_books (
          *,
          creators ( * )
        )
      ),
      users ( * )
    `)
    .in('user_id', userIds)
    .order('user_id', { ascending: true })
    .order('started_at', { ascending: false })

  if (error) {
    console.error('Error fetching reading progress:', error)
    return []
  }

  // Deduplicate: only keep latest entry per user
  const uniqueByUser = new Map()
  for (const item of data) {
    if (!uniqueByUser.has(item.user_id)) {
      uniqueByUser.set(item.user_id, item)
    }
  }

  return Array.from(uniqueByUser.values())
}

export { 
  getUserLikedBooks,
  getUserReviewedBooks,
  getPublishedBooks,
  getBooksByGenres,
  getOthersStartedReading
}