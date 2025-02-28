import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import StoryCarousel from '@components/PageComponents/story/StoryCarousel'
import tw from 'twrnc'
import { Story } from '@models/story.type'
import { View } from 'react-native'
import ShimmerPlaceHolder from '@components/styled/Shimmer'

const story = () => {
	const { synopsis } = useGlobalSearchParams()
	// const { story: response, isLoading, error } = useStory(synopsis as string)
	// const [timer, setTimer] = useState(0)
	// const intervalRef = useRef<NodeJS.Timeout | null>(null)
	// const [comTime, setComTime] = useState(0)
	// const queryClient = useQueryClient()

	const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Story[]>({
    queryKey: ['story', story],
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

  

  
	// const updateAchievementMutation = useMutation({
	// 	mutationFn: async (achievement: string) => {
	// 		const { data, error } = await supabase.from('profiles').update({
	// 			achievements: (user?.achievements === null || user?.achievements === undefined) ? [achievement] : [...user?.achievements, achievement]
	// 		}).eq('id', user?.id).single()
	// 		if (error) {
	// 			return error
	// 		}
	// 		return data
	// 	},
	// 	onSuccess: () => {
	// 		setAchievement(null)
	// 		queryClient.invalidateQueries({
	// 			queryKey: [`user-${user?.id}`]
	// 		})
	// 	},
	// 	onError: (error) => {
	// 		Sentry.captureException(error)
	// 	}
	// })

	// useEffect(() => {
	// 	if (!isLoading && !error) {
	// 		intervalRef.current = setInterval(() => {
	// 			setTimer(timer + 1)
	// 			setComTime(prevComTime => prevComTime + 1)
	// 		}, 1000)
	// 	}

	// 	return () => {
	// 		if (intervalRef.current != null) clearInterval(intervalRef.current)
	// 	}
	// }, [isLoading, error])

	// useEffect(() => {
	// 	if (achievement !== null) {
	// 		Toast.show({
	// 			type: 'info',
	// 			text1: achievement.title,
	// 			text1Style: {
	// 				fontWeight: 'bold',
	// 				fontSize: getDynamicValue(20)
	// 			},
	// 			text2: achievement.description,
	// 			text2Style: {
	// 				fontSize: getDynamicValue(16)
	// 			},
	// 		})
	// 		void updateAchievementMutation.mutate(achievement.title)
	// 		setAchievement(null)
	// 	}
	// }, [achievement])

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

	return (
		<StoryCarousel story={data.pages.flat()}/>
	)

	return (
		<></>
	)
}

export default story