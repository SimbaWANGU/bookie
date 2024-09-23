import { useBookStore } from "@stores/useBookStore"

const useFilteredGenre = (): [string, (genre: string) => void] => {
  const [filteredGenre, setFilteredGenre] = useBookStore((state) => [state.filteredGenre, state.setFilteredGenre])

  return [filteredGenre, setFilteredGenre]
}

export default useFilteredGenre