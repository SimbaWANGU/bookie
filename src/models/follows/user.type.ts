export interface UserWithFollow {
  id: string
  created_at: string
  updated_at: string
  name: string
  email: string
  user_name: string
  avatar_url: string
  bio: string
  is_following: boolean
  expo_push_token: string
}