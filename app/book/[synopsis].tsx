import { ImageBackground, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import { View } from '@components/styled/Themed'
import { LinearGradient } from 'expo-linear-gradient'
import { dark, light } from '@constants/Color'
import { StatusBar } from 'expo-status-bar'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { supabase } from '@utils/supabase'
import useTimer from '@hooks/useTimer'
import useUser from '@hooks/useUser'
import { useBooks } from '@hooks/useBooks'
import SynopsisHeader from '@components/headers/synopsisHeader'
import tw from 'twrnc'
import * as Sentry from '@sentry/react-native'

const synopsis = () => {
	const { synopsis } = useLocalSearchParams()
	const queryClient = useQueryClient()
	const { books } = useBooks()
	const selectedBook = books?.find((book) => book.id === synopsis as string)
	const [timer, setTimer] = useTimer()
	const [user] = useUser()

	useEffect(() => {
		const increment_by = async () => {
			const { error } = await supabase
				.rpc('increment_my_cumulative_time', {
					increment_by: timer, 
					row_id: user?.id
				})
			if (error) {
				Sentry.captureException(error)
			}
		}

		if (timer > 0) {
			increment_by()
			setTimer(0)
		}
    
		return () => {
			queryClient.invalidateQueries({
				queryKey: [`user-${user?.id}`]
			})
		}
	}, [timer])

	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<ImageBackground
				source={{ uri: selectedBook!.synopsisBgImage as string}}
				style={tw`h-full w-full`}
			>
				<LinearGradient
					colors={['#00000022', dark.background]}
					locations={[0.2, 0.9]}
					style={tw`h-full w-full`}
				>
					<SynopsisHeader />
					<View style={tw`bg-transparent justify-end p-4 pb-40 absolute w-full h-full`}>
						<QuickSandText
							style={tw`text-3xl p-2`}
							lightColor={light.activeIconColor}
							darkColor={dark.activeIconColor}
						>{selectedBook!.title}</QuickSandText>
						<MonoText
							style={tw`text-xl p-2`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{selectedBook!.synopsis}</MonoText>
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
				</LinearGradient>
			</ImageBackground>
			<StatusBar
				style='light'
			/>
		</View>
	)
}

export default synopsis