import { useBookStore } from "@stores/useBookStore"

const useSearch = (): [string, (search: string) => void] => {
  const [search, setSearch] = useBookStore((state) => [state.search, state.setSearch])

  return [search, setSearch]
}

export default useSearch