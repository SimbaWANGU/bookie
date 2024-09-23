export type userProfile = {
  avatar_url: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  favorites: string[] | null;
  achievements: string[] | null;
  queue: string[] | null;
  completed: string[] | null;
  cumulative_time: number | null;
}