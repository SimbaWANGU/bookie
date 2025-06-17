interface AudioBook {
  id: number
  book_id: string
  source: string
  created_at: string
  updated_at: string
}

interface Genre {
  id: string
  name: string
  created_at: string
}

interface BookGenre {
  genres: Genre[]
}

interface Creator {
  id: string
  name: string
  created_at: string
  bio?: string
}

interface CreatorBook {
  creators: Creator
}

interface Book {
  id: string
  title: string
  description: string
  is_audio: boolean
  cover_image_url: string
  created_at: string
  updated_at: string
  audio_books: AudioBook[]
  book_genres: BookGenre[]
  creator_books: CreatorBook[]
}

export {
  Book
}