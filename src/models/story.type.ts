interface Story {
  id: string | null
  bookId: string | null
  storyContent: string[]
}

interface getStoryResponse {
  story: Story
}

interface storySwiperProps {
  text: string
  bookId: string
}

export {
	Story,
	getStoryResponse,
	storySwiperProps
}