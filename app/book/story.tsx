import React, { useMemo } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import StoryCarousel from '@components/PageComponents/story/StoryCarousel'
import { View } from 'react-native'
import ShimmerPlaceHolder from '@components/styled/Shimmer'
import { QueryKeys } from '@constants/QueryKeys'
import tw from '@utils/tailwind'
import useKeepAwakeOnScreen from '@hooks/useKeepAwakeOnScreen'
import { useAtom } from 'jotai'
import { lastPageProgressAtom } from '@stores/story.state'
import { fetchStory } from '@api/story/api.stories'

const story = () => {
  const { synopsis } = useGlobalSearchParams()
  const [lastPageProgress] = useAtom(lastPageProgressAtom)
  useKeepAwakeOnScreen()

  const safePage = Number.isFinite(lastPageProgress) && lastPageProgress > 0 ? lastPageProgress : 1
  const initialOffset = useMemo(() => Math.floor((safePage - 1) / 10) * 10, [safePage])

	const { data, isLoading: isDataLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.story, synopsis, initialOffset], // make sure queryKey is unique per offset
    queryFn: async ({ pageParam = initialOffset }: { pageParam?: number }) => await fetchStory(pageParam, synopsis as string),
    getNextPageParam: (lastPage, pages) => lastPage.length < 10 ? undefined : pages.length * 10 + initialOffset,
    initialPageParam: initialOffset,
    enabled: !!synopsis,
  })

	if (isDataLoading) {
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
		<StoryCarousel story={newData} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
	)
}

export default story