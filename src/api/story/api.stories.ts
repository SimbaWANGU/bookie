// api/booksApi.ts
import { supabase } from '@utils/supabase'

export const fetchStory = async () => {
  const { data, error } = await supabase.from('books').select('*').eq('is_audio', false)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export {
  
}