import { LikedBookFeedEntry, UserFeedItem } from '@models/feed.type'
import { supabase } from '@utils/supabase'

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
}

const getUserFeed = async (id: string, offset = 0, limit = 15): Promise<UserFeedItem[]> => {
  const { data, error } = await supabase.rpc('get_user_feed', {
    this_user_id: id,
    offset_count: offset,
    limit_count: limit
  })

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((item: UserFeedItem) => ({
    ...item,
    actors: item.actors ?? [],
    books: item.books ?? null,
  }))
}

const getFeedItemStats = async (id: string) => {
  const { data, error } = await supabase.from('books')
    .select(`
      review_count: user_reviews_book(count),
      like_count: user_likes_book(count)
    `)
    .eq('id', id)

  if (error) throw new Error(error.message)
  return data
}

const getFeedItemLikes = async (id: string) => {
  const { data, error } = await supabase
    .from('user_likes_book')
    .select(`user:users ( id, user_name, name, avatar_url )`)
    .eq('book_id', id)

  if (error) throw new Error(error.message)
  return data
}

const getFeedItemReviewed = async (id: string) => {
  const { data, error } = await supabase
    .from('user_reviews_book')
    .select(`review, created_at, user: users ( id, user_name, name, avatar_url )`)
    .eq('book_id', id)

    if (error) throw new Error(error.message)
    return data
}

export {
  getBooksByGenres, getFeedItemLikes, getFeedItemStats, getPublishedBooks, getUserFeed, getFeedItemReviewed
}
