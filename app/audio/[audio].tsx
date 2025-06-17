import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { View } from '@components/styled/Themed'
import { LinearGradient } from 'expo-linear-gradient'
import { dark, light } from '@constants/Color'
import { StatusBar } from 'expo-status-bar'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { Book } from '@models/audiobook.type'
import tw from '@utils/tailwind'
import InteractionOptions from '@components/styled/InteractionOptions'
import { fetchAudioBook } from '@api/books/api.book'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import BottomSheetView from '@components/PageComponents/synopsis/BottomSheetView'
import Author from '@components/PageComponents/synopsis/Author'
import { QueryKeys } from '@constants/QueryKeys'
import { useAudioPlayer } from 'expo-audio'

const audio = () => {
	const { audio } = useLocalSearchParams()
	const [user] = useAtom(userAtom)
	const [modalVisible, setModalVisible] = useState(false)  
  
	const { data: book } = useQuery<Book>({
    queryKey: [QueryKeys.book, audio],
		queryFn: () => fetchAudioBook({ audio })
	})

  const player = useAudioPlayer({ uri: book?.audio_books[0].source as string })

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
							<Author name={book?.creator_books![0].creators.name as string} id={book?.creator_books![0].creators.id as string} />
							<QuickSandText
								style={tw`text-4xl p-2`}
								lightColor={light.activeIconColor}
								darkColor={dark.activeIconColor}
							>{book?.title}</QuickSandText>
							<ScrollView style={tw`max-h-1/2 my-2`} >
								<MonoText
									style={tw`text-sm p-2`}
									lightColor={dark.text}
									darkColor={dark.text}
								>{book?.description}</MonoText>
							</ScrollView>
							<InteractionOptions user_id={user?.id as string} book_id={book?.id as string} openAndClose={() => setModalVisible(true)}  />
							<TouchableOpacity
								activeOpacity={.8}
								style={[tw`flex flex-row self-center mt-6 p-4 items-center justify-center rounded-full aspect-square`, {
									backgroundColor: dark.text
								}]}
								onPress={() => player.play() }
							>
								{/* <QuickSandText
									style={[tw`text-base w-auto`, {
										color: light.activeIconColor
									}]}
								>{2 > 3 ? 'Loading...' : progress.paragraph_no > 1 ? 'Continue reading' : 'Start Reading'}</QuickSandText> */}
								<FontAwesomeSixIcons name="play" style={tw`ml-1 text-4xl self-center`} color={light.activeIconColor} />
							</TouchableOpacity>
						</View>
					</View>
					<BottomSheetView book_id={book?.id as string} modalVisible={modalVisible} setModalVisible={(bool) => setModalVisible(bool)} /> 
				</LinearGradient>
			</ImageBackground>
			<StatusBar style='light' />
		</View>
	)
}

export default audio
