interface Book {
  id: string
  genre: string[]
  onDisplayPage: boolean
  synopsis: string
  synopsisBgImage: string
  title: string
  reactions: Reactions[]
  readCount: number
}

interface Reactions {
  username: string
  emoji: string
}

interface getBooksResponse {
  books: Book[]
}

export {
	Book,
	getBooksResponse
}