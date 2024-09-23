import { getStoryResponse } from '@models/story.type'
import axios from 'axios'

export const storiesApi = {
  getStory: async (id: string) => {
    const result = await axios.get<getStoryResponse>(
      `${process.env.EXPO_PUBLIC_API as string}/stories/${id}`
    )

    return result
  },
}