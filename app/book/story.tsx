import React, { useEffect, useRef, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ShimmerPlaceHolder from '@components/styled/Shimmer'
import { View } from '@components/styled/Themed'
import Toast from 'react-native-toast-message'
import { supabase } from '@utils/supabase'
import { getDynamicValue } from '@constants/Functions'
import StoryCarousel from '@components/PageComponents/story/StoryCarousel'
import tw from 'twrnc'
import * as Sentry from '@sentry/react-native'

const story = () => {
	const { synopsis } = useGlobalSearchParams()
	// const { story: response, isLoading, error } = useStory(synopsis as string)
	const [timer, setTimer] = useState(0)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const [comTime, setComTime] = useState(0)
	const queryClient = useQueryClient()
  
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

	// if (isLoading) {
	// 	return (
	// 		<View style={tw`h-full w-full items-center justify-center`}>
	// 			<ShimmerPlaceHolder style={{
	// 				height: '10%',
	// 				width: '90%',
	// 			}} />
	// 		</View>
	// 	)
	// }

	// return (
	// 	<StoryCarousel story={response}/>
	// )

	return (
		<></>
	)
}

export default story