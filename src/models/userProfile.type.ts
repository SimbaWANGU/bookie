interface CustomUser {
  avatar_url: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  user_name: string;
  bio?: string
  expo_push_token: string
  follower_count: number
  following_count: number
  authors_followed_count: number
  completed_books: number
  total_time_spent: number
}

export {
  CustomUser
}