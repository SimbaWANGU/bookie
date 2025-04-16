import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import StoryCarousel from '@components/PageComponents/story/StoryCarousel'
import { Story } from '@models/story.type'
import { View } from 'react-native'
import ShimmerPlaceHolder from '@components/styled/Shimmer'
import { QueryKeys } from '@constants/QueryKeys'
import tw from '@utils/tailwind'

const story = () => {
	const { synopsis } = useGlobalSearchParams()

	const { data, isLoading } = useInfiniteQuery<Story[]>({
    queryKey: [QueryKeys.story, story],
    queryFn: async ({ pageParam = 0 }) => {
      // Fetch paragraphs for the given story using offset pagination.
      const { data, error } = await supabase.from('story_paragraphs').select('*').eq('book_id', synopsis).range(pageParam as number, pageParam as number + 10 - 1)
      if (error) throw new Error(error.message)
      return data
    },
    // The next page offset is calculated as the current number of pages * 10.
    getNextPageParam: (lastPage, pages) => {
      // If the last page returned fewer items than "10", there are no more pages.
      if (lastPage.length < 10) return undefined
      return pages.length * 10
    },
    initialPageParam: 0,
  })

	if (isLoading) {
		return (
			<View style={tw`h-full w-full items-center justify-center`}>
				<ShimmerPlaceHolder style={{
					height: '10%',
					width: '90%',
				}} />
			</View>
		)
	}

  if (!data) {
    return (
      <></>
    )
  }
	
	const newData = data.pages.flat()

	return (
		<StoryCarousel story={newData} />
	)
}

export default story