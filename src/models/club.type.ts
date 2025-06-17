import { Book } from "./book.type"

interface BookClub {
  id: string
  club_name: string
  description: string
  visibility: boolean
  created_at: string // ISO date string
  updated_at: string // ISO date string
  user_id: string
}

interface BookClubMember {
  book_club_id: string
  created_at: string
  role: 'ADMIN' | 'MEMBER' // Add more roles if applicable
  status: 'INVITED' | 'ACCEPTED' // Add other possible statuses if needed
  user_id: string
  book_clubs: BookClubShort
}

interface BookClubShort {
  club_name: string
  description: string
  visibility: boolean
  book_club_reads: BookClubRead[]
}

interface BookClubRead {
  books: Book
}

export {
  BookClub,
  BookClubMember
}