import { ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import { View } from '@components/styled/Themed'
import { LinearGradient } from 'expo-linear-gradient'
import { dark, light } from '@constants/Color'
import { StatusBar } from 'expo-status-bar'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { supabase } from '@utils/supabase'
import SynopsisHeader from '@components/headers/synopsisHeader'
import tw from 'twrnc'
import * as Sentry from '@sentry/react-native'

const synopsis = () => {
	const { synopsis } = useLocalSearchParams()
	const queryClient = useQueryClient()
	const [books] = useState()
	const selectedBook = books
	const [timer, setTimer] = useState()
	const [user] = useState()

	// useEffect(() => {
	// 	const increment_by = async () => {
	// 		const { error } = await supabase
	// 			.rpc('increment_my_cumulative_time', {
	// 				increment_by: timer, 
	// 				row_id: user?.id
	// 			})
	// 		if (error) {
	// 			Sentry.captureException(error)
	// 		}
	// 	}

	// 	if (timer > 0) {
	// 		increment_by()
	// 		setTimer(0)
	// 	}
    
	// 	return () => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: [`user-${user?.id}`]
	// 		})
	// 	}
	// }, [timer])

	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<ImageBackground
				source={{ uri: 'https://ui-avatars.com/api/?name=U+N' }}
				style={tw`h-full w-full`}
			>
				<LinearGradient
					colors={['#00000022', dark.background]}
					locations={[0.2, 0.9]}
					style={tw`h-full w-full`}
				>
					<View style={[tw`bg-transparent flex-1 flex-col-reverse pb-14 px-4`, { justifyContent: 'flex-start' }]}>
						<View style={tw`bg-transparent`}>
							<QuickSandText
								style={tw`text-3xl p-2`}
								lightColor={light.activeIconColor}
								darkColor={dark.activeIconColor}
							>{''}</QuickSandText>
							<MonoText
								style={tw`text-xl p-2`}
								lightColor={dark.text}
								darkColor={dark.text}
							>{''}</MonoText>
							<Pressable
								style={[tw`flex flex-row mt-6 p-4 px-4 items-center justify-between w-5/12 rounded-full`, {
									backgroundColor: dark.text
								}]}
								onPress={() => {
									router.push('/book/story')
								}}
							>
								<QuickSandText
									style={[tw`text-base`, {
										color: light.activeIconColor
									}]}
								>Read Story</QuickSandText>
								<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
							</Pressable>
						</View>
					</View>
				</LinearGradient>
			</ImageBackground>
			<StatusBar style='light' />
		</View>
	)
}

export default synopsis
