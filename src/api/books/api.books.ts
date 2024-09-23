import axios from 'axios'
import { getBooksResponse } from '@models/book.type'

export const booksApi = {
  getBooks: async () => {
    const result = await axios.get<getBooksResponse>(
      `${process.env.EXPO_PUBLIC_API as string}/books/getBooks`
    )

    return result
  },
}