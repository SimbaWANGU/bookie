interface User {
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  user_name: string;
}

interface BookReview {
  book_id: string;
  created_at: string;
  review: string;
  user_id: string;
  users: User;
}

export {
  BookReview
}