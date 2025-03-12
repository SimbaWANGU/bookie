import { Alert, ImageBackground, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { View } from '@components/styled/Themed'
import { LinearGradient } from 'expo-linear-gradient'
import { dark, light } from '@constants/Color'
import { StatusBar } from 'expo-status-bar'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import * as Sentry from '@sentry/react-native'
import { Book } from '@models/book.type'
import tw from '@utils/tailwind'
import InteractionOptions from '@components/styled/InteractionOptions'
import { fetchBook } from '@api/books/api.book'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import { bookAtom } from '@stores/books.state'
import { checkReadingProgress, initialReadingProgress } from '@api/story/api.progress'
import { progressAtom } from '@stores/story.state'
import BottomSheetView from '@components/PageComponents/synopsis/BottomSheetView'

const synopsis = () => {
	const { synopsis } = useLocalSearchParams()
	const [user] = useAtom(userAtom)
	const [, setSelectedBook] = useAtom(bookAtom)
	const [progress, setProgress] = useAtom(progressAtom)
	const [modalVisible, setModalVisible] = useState(false)
	const [snapPoint, setSnapPoint] = useState(-1)

	const { data: book, isLoading: bookLoading, error: bookError} = useQuery<Book>({
		queryKey: ['book', synopsis],
		queryFn: () => fetchBook({ synopsis })
	})

	const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['initial-progress', book?.id, user?.id],
    queryFn: () => checkReadingProgress(book?.id as string, user?.id as string),
    enabled: !!book && !!user,
  })

	// Mutation: Create initial progress record if none exists
  const createInitialProgressMutation = useMutation({
    mutationKey: ['register-initial-progress', book?.id, user?.id],
    mutationFn: () => 
      initialReadingProgress({
        book_id: book?.id as string,
        paragraph_id: book?.story_paragraphs![0].id as string,
        paragraph_no: book?.story_paragraphs![0].paragraph_no as number,
        user_id: user?.id as string,
        started_at: new Date(),
        last_updated_at: new Date(),
        completed_at: new Date(),
        total_time_spent: 0,
        status: 'STARTED'
      })
  })

	const openAndCloseComments = () => {
		if (snapPoint === -1 ) {
			setSnapPoint(2)
		} else {
			setSnapPoint(-1)
		}
	}
	
	useEffect(() => {
		if (progressLoading) return;
		
		if (progressData && progressData.length > 0) {
			console.log('Progress exists');
			setProgress(() => {
				if (progressData[0].current_paragraph) {
					console.log('L', progressData);
					return {
						paragraph_no: progressData[0].current_paragraph,
						paragraph_id: progressData[0].paragraph_id
					};
				} else {
					console.log('M', progressData);
					return {  
						paragraph_no: 1,
						paragraph_id: ''
					};
				}
			});
		} else {
			// When progressData is empty or undefined, set default progress.
			console.log('No progress data, setting default');
			setProgress({
				paragraph_no: 1,
				paragraph_id: ''
			});
		}
	}, [progressLoading, progressData]);

	const dummyComments = [
		{
			id: '1',
			user: 'Alice',
			userName: 'Alice Johnson',
			profilePicture: 'https://example.com/path/to/alice.png',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat officia, iusto aliquid consequuntur, ipsum cumque quas saepe mollitia necessitatibus obcaecati maiores sequi nulla beatae excepturi perspiciatis. Voluptatum, ullam porro.'
		},
		{
			id: '2',
			user: 'Bob',
			userName: 'Robert Smith',
			profilePicture: 'https://example.com/path/to/bob.png',
			text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, dolorum magni? Provident temporibus ab sapiente impedit ullam velit, magnam ex tempore omnis. Vitae officiis vel cumque doloremque iste eum accusantium nostrum repellat eveniet aliquid neque illum maxime cum, porro excepturi.'
		},
		{
			id: '3',
			user: 'Charlie',
			userName: 'Charlie Brown',
			profilePicture: 'https://example.com/path/to/charlie.png',
			text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, obcaecati.'
		},
		// add more comments as needed
	]

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
						{/* {snapPoint === -1 ? <></> : <TouchableOpacity onPress={() => setSnapPoint(-1)} style={tw`bg-transparent flex-1`} />} */}
						<View style={tw`bg-transparent`}>
							<QuickSandText
								style={tw`text-3xl p-2`}
								lightColor={light.activeIconColor}
								darkColor={dark.activeIconColor}
							>{book?.title}</QuickSandText>
							<ScrollView style={tw`max-h-1/3 my-2`} >
								<MonoText
									style={tw`text-sm p-2`}
									lightColor={dark.text}
									darkColor={dark.text}
								>{book?.description}</MonoText>
							</ScrollView>
							<InteractionOptions user_id={user?.id as string} book_id={book?.id as string} openAndClose={() => setModalVisible(true)}  />
							<TouchableOpacity
								activeOpacity={.8}
								style={[tw`flex flex-row mt-6 p-4 px-4 items-center justify-between w-7/12 rounded-full`, {
									backgroundColor: dark.text
								}]}
								onPress={() => {
									setSelectedBook(book as Book)
									if (progressLoading) return
									if (!(progressData && progressData.length > 0)) {
										createInitialProgressMutation.mutate(undefined, {
											onSuccess: () => {
												router.push(`/book/story`)
											}
										})
									} else {
										router.push(`/book/story`)
									}
								}}
							>
								<QuickSandText
									style={[tw`text-base w-auto`, {
										color: light.activeIconColor
									}]}
								>{progressLoading ? 'Loading...' : progress.paragraph_no > 1 ? 'Continue reading' : 'Start Reading'}</QuickSandText>
								<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
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

export default synopsis
