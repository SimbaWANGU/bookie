import { useQuery } from "@tanstack/react-query"
import { bookKeys } from "@api/query-factory"
import { useBookStore } from "@stores/useBookStore"
import { useEffect } from "react"

const useBooks = () => {
  const [books, setBooks] = useBookStore((state) => [state.books, state.setBooks])
  const { data, isLoading, isError, error } = useQuery(
    bookKeys.book.list()
  )

  useEffect(() => {
    if (data && data.data.books) {
      setBooks(data.data.books)
    }
  }, [isLoading, data, isError, error])

  return {
    books,
    isLoading,
    isError,
    error,
  }
}

export { useBooks }