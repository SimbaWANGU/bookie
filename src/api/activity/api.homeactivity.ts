import { supabase } from "@utils/supabase";

const getUserLikedBooks = async () => {
  const { data, error } = await supabase
    .from('user_likes_book')
    .select(`
      *,
      users ( * ),
      books ( * )
    `);
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
    `);
  if (error) throw new Error(error.message);
  return data;
}

const getPublishedBooks = async () => {
  const { data, error } = await supabase
    .from('creator_books')
    .select(`
      *,
      creators ( * ),
      books ( * )
    `);
  if (error) throw new Error(error.message);
  return data;
}

export { 
  getUserLikedBooks,
  getUserReviewedBooks,
  getPublishedBooks
}