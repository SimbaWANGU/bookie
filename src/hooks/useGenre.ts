import { useBookStore } from "@stores/useBookStore"

const useGenre = (): [string[], (genre: string[]) => void] => {
  const [genres, setGenres] = useBookStore((state) => [state.genres, state.setGenres])

  return [genres, setGenres]
}

export default useGenre