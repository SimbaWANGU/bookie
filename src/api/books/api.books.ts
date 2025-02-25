import axios from 'axios'
import { supabase } from '@utils/supabase'

interface T {}

export const booksApi = {
  getBooks: async () => {
    const { data, error } = await supabase.from('books').select('*')
    // console.log(data, error)
    return data
  },
}