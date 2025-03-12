import { Story } from './story.type'

// Represents a Genre object
interface Genre {
  name: string;
}

// Represents the junction table object for book_genres
interface BookGenre {
  genres: Genre;
}

// Represents a Creator object
interface Creator {
  name: string;
}

// Represents the junction table object for creator_books
interface CreatorBook {
  creators: Creator;
}

// Represents a paragraph for a book
interface StoryParagraph {
  id: string;
  paragraph_no: number;
  content: string;
}

interface StoryParagraphCount {
  count: number
}

// Represents a Book with its nested relationships
interface Book {
  id: string;
  title: string;
  description: string;
  cover_image_url: string
  // Include any additional book columns as needed
  book_genres?: BookGenre[];
  creator_books?: CreatorBook[];
  story_paragraphs?: StoryParagraph[]
  user_likes_book?: []
  user_reviews_book?: []
  user_reading_progress: []
  story_paragraph_count?: StoryParagraphCount[]
  created_at: string
  updated_at: string
}

export type {
  Book,
  BookGenre
}