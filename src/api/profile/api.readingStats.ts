import { supabase } from '@utils/supabase'

const getCompletedBooksReadingStats = async () => {
  const { data, error } = await supabase.from('user_reading_progress')
    .select(`
      *,
      books (*)
    `
    ).eq('status', 'COMPLETED')

  if (error) {
    throw new Error(error.message)
  }
    
  return data
}

export {
  getCompletedBooksReadingStats
}