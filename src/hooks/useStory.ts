import { useQuery } from "@tanstack/react-query"
import { storyKeys } from "@api/query-factory"
import { useBookStore } from "@stores/useBookStore"
import { useEffect } from "react"

const useStory = (id: string) => {
  const [story, setStory] = useBookStore((state) => [state.story, state.setStory])
  const { data, isLoading, isError, error } = useQuery(
    storyKeys.story.instance(id)
  )

  useEffect(() => {
    if (data && data.data.story) {
      setStory(data.data.story)
    }
  }, [isLoading, data, isError, error])

  return {
    story,
    isLoading,
    isError,
    error,
  }
}

export default useStory