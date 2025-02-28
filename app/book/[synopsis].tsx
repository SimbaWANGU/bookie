import { ImageBackground, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { View } from '@components/styled/Themed'
import { LinearGradient } from 'expo-linear-gradient'
import { dark, light } from '@constants/Color'
import { StatusBar } from 'expo-status-bar'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { supabase } from '@utils/supabase'
import SynopsisHeader from '@components/headers/synopsisHeader'
import * as Sentry from '@sentry/react-native'
import { Book } from '@models/book.type'
import tw from '@utils/tailwind'

const synopsis = () => {
	const { synopsis } = useLocalSearchParams()
	const queryClient = useQueryClient()
	const [books] = useState()
	const selectedBook = books
	const [timer, setTimer] = useState()
	const [user] = useState()

	const { data: book, isLoading, error} = useQuery<Book>({
		queryKey: ['book', synopsis],
		queryFn: async () => {
			const { data, error } = await supabase.from('books').select(`
			*,
			book_genres (
				genres (name)
			),
			creator_books (
				creators (name)
			)
  	`).eq('id', synopsis).single()

			if (error) {
				throw new Error(error.message)
			}

			return data
		}
	})

	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<ImageBackground
				source={{ uri: book?.cover_image_url }}
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
							>{book?.title}</QuickSandText>
							<ScrollView style={tw`h-1/3`}>
								<MonoText
									style={tw`text-sm p-2`}
									lightColor={dark.text}
									darkColor={dark.text}
								>{book?.description}</MonoText>
							</ScrollView>
							<TouchableOpacity
								activeOpacity={.8}
								style={[tw`flex flex-row mt-6 p-4 px-4 items-center justify-between w-5/12 rounded-full`, {
									backgroundColor: dark.text
								}]}
								onPress={() => {
									router.push(`/book/story`)
								}}
							>
								<QuickSandText
									style={[tw`text-base`, {
										color: light.activeIconColor
									}]}
								>Read Story</QuickSandText>
								<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>
			</ImageBackground>
			<StatusBar style='light' />
		</View>
	)
}

export default synopsis
