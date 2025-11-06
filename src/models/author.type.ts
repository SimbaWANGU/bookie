interface Author {
  id: string
  created_at: string
  updated_at: string
  bio?: string
  email: string
  alias: string
  name: string
  avatar_url: string
  expo_push_token: string
  users_following_count: number
  books_count: {
    count: number
  }[]
  liked_count?: {
    books: {
      user_likes_book: {
        count: number
      }[]
    }
  }[]
}

export {
  Author
}