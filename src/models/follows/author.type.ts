export interface CreatorWithFollow {
  id: string
  created_at: string
  updated_at: string
  alias: string
  avatar_url: string
  bio: string | null
  email: string
  name: string
  is_following: boolean
}