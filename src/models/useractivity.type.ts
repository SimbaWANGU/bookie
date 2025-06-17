// returned from user_likes_books

interface User {
  id: string
  name: string
  user_name: string
  email: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  expo_push_token: string
}

interface Creator {
  alias: string;
  bio: string | null;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  avatar_url: string
  expo_push_token: string
}

interface Genre {
  name: string;
}

interface BookGenre {
  genres: Genre;
}

interface BookDetails {
  book_genres: BookGenre[]
  cover_image_url: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  updated_at: string;
  is_audio: boolean
}

interface BookLiked {
  book_id: string;
  created_at: string;
  user_id: string;
  users: User;
  books: BookDetails
}

interface BookReview {
  book_id: string;
  created_at: string;
  review: string;
  user_id: string;
  users: User;
  books: BookDetails
}

interface BookEntry {
  book_id: string;
  books: BookDetails;
  created_at: string;
  creator_id: string;
  creators: Creator;
  updated_at: string;
}

interface BookByGenre {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  is_audio: boolean;
  created_at: string;
  updated_at: string;
  book_genres: {
    genres: Genre;
  }[];
  creator_books: {
    creators: Creator;
  }[];
}

interface ReadingProgress {
  book_id: string
  books?: Book
  completed_at: string | null
  current_paragraph: number
  last_updated_at: string
  paragraph_id: string
  started_at: string
  status: 'UPDATED' | 'COMPLETED' | 'NOT_STARTED' // update as per your enum
  total_time_spent: number | null
  user_id: string
  users?: User
}

interface Book {
  id: string
  title: string
  description: string
  cover_image_url: string
  is_audio: boolean
  created_at: string
  updated_at: string
  creator_books: CreatorBook[]
}

interface CreatorBook {
  id: string
  book_id: string
  creator_id: string
  role: string // e.g., 'author', 'editor', etc.
  creators: Creator
}

export {
  BookLiked,
  BookReview,
  BookEntry,
  BookByGenre,
  ReadingProgress
}
