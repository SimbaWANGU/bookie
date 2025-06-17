import { supabase } from '@utils/supabase'

interface ReadingProgress {
  book_id?: string
  paragraph_id?: string
  paragraph_no?: number
  user_id?: string
  started_at?: Date
  last_updated_at?: Date
  completed_at?: Date
  total_time_spent?: number
  status?: string
}

const checkReadingProgress = async (book_id: string, user_id: string) => {
  const { data, error } = await supabase.from ('user_reading_progress').select('*')
    .eq('user_id', user_id)
    .eq('book_id', book_id)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

const initialReadingProgress = async ({ book_id, paragraph_id, paragraph_no = 1, user_id, started_at, total_time_spent }: ReadingProgress) => {
  const { data, error } = await supabase.from('user_reading_progress').insert([
    {
      book_id,
      paragraph_id,
      current_paragraph: paragraph_no,
      user_id,
      started_at,
      total_time_spent,
      last_updated_at: started_at,
      status: 'STARTED'
    },
  ])

  if (error) {
    throw new Error(error.message)
  }
  return data
}

const updateReadingProgress = async (progress: ReadingProgress, state: 'UPDATED' | 'COMPLETED') => {
  const { book_id, paragraph_id, user_id, paragraph_no, last_updated_at, status, completed_at, total_time_spent } = progress

  if (state === 'UPDATED') {
    const { error } = await supabase
      .from('user_reading_progress')
      .update({
        current_paragraph: paragraph_no,
        paragraph_id,
        last_updated_at,
        ...(total_time_spent !== undefined && { total_time_spent }),
        status: 'UPDATED'
      })
      .eq('book_id', book_id)
      .eq('user_id', user_id)

    if (error) {
      throw new Error(error.message)
    }
    
  } else {
    const { error } = await supabase
      .from('user_reading_progress')
      .update({
        current_paragraph: paragraph_no,
        paragraph_id,
        last_updated_at,
        ...(completed_at && { completed_at }),
        ...(total_time_spent !== undefined && { total_time_spent }),
        status: 'COMPLETED'
      })
      .eq('book_id', book_id)
      .eq('user_id', user_id)

    if (error) {
      throw new Error(error.message)
    }
  }
}

export {
  checkReadingProgress,
  initialReadingProgress,
  updateReadingProgress
}