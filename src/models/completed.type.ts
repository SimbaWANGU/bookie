interface Book {
  cover_image_url: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  updated_at: string;
}

interface BookProgress {
  book_id: string;
  books: Book;
  completed_at: string | null;
  current_paragraph: number;
  last_updated_at: string;
  paragraph_id: string;
  started_at: string;
  status: string;
  total_time_spent: number | null;
  user_id: string;
}

export{
  BookProgress
}