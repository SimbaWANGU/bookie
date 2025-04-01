// api/booksApi.ts
import { supabase } from '@utils/supabase'

interface LikeExcerpt {
  user_id: string
  paragraph_id: string
  paragraph_no: number
}

export const likeExcerpt = async ({ user_id, paragraph_id, paragraph_no }: LikeExcerpt) => {
  const { data, error } = await supabase
    .from('user_likes_story_paragraph')
    .insert([
      { user_id, paragraph_id, paragraph_no },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const subscribeExcerpt = () => {}

//? 1. endpoint for featured books
//? 2. endpoint for latest books