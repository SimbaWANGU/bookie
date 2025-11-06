import { fetchBook } from '@api/books/api.book'
import { checkReadingProgress, initialReadingProgress } from '@api/story/api.progress'
import { getCurrentPosition } from '@api/story/api.stories'
import Author from '@components/PageComponents/synopsis/Author'
import BottomSheetView from '@components/PageComponents/synopsis/BottomSheetView'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import InteractionOptions from '@components/styled/InteractionOptions'
import { QuickSandTextRegular, QuickSandTextSemiBold, SpaceMonoTextRegular } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { MutationKeys } from '@constants/MutationKeys'
import { QueryKeys } from '@constants/QueryKeys'
import { Book } from '@models/book.type'
import { bookAtom } from '@stores/books.state'
import { lastPageProgressAtom, progressAtom, timeTakenInBookAtom } from '@stores/story.state'
import { userAtom } from '@stores/user.state'
import { useMutation, useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'

// ? check why book isnt being opened

const synopsis = () => {
  const { synopsis } = useLocalSearchParams()
  const [user] = useAtom(userAtom)
  const [, setLastPageProgress] = useAtom(lastPageProgressAtom)
  const [, setLastReadingTime] = useAtom(timeTakenInBookAtom)
  const [, setSelectedBook] = useAtom(bookAtom)
  const [progress, setProgress] = useAtom(progressAtom)
  const [modalVisible, setModalVisible] = useState(false)

  const { data: book } = useQuery<Book>({
    queryKey: [QueryKeys.book, synopsis],
    queryFn: () => fetchBook({ synopsis }),
  })

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: [QueryKeys.initialProgress, book?.id],
    queryFn: async () => await checkReadingProgress(book?.id as string, user?.id as string),
    enabled: !!book && !!user,
  })

	const { data: initalParagraphs, isLoading: initalParagraphsLoading } = useQuery({
		queryKey: [QueryKeys.initalParagraph, book?.id],
		queryFn: async () => await getCurrentPosition(book?.id as string),
		enabled: !!book?.id && !progressLoading && (!progressData || progressData.length === 0)
	})
	
	// Mutation: Create initial progress record if none exists
  const createInitialProgressMutation = useMutation({
    mutationKey: [MutationKeys.registerInitialProgress, book?.id, user?.id],
		mutationFn: () => {
			if (!initalParagraphs || initalParagraphs.length === 0) {
				throw new Error('No initial paragraph found for this book')
			}
		
			return initialReadingProgress({ book_id: book?.id as string, paragraph_id: initalParagraphs[0].id, paragraph_no: 1, user_id: user?.id as string, started_at: new Date(), last_updated_at: new Date(), completed_at: new Date(), total_time_spent: 0, status: 'STARTED' })
		}  })
	
  useEffect(() => {
    if (progressLoading) return
    if (progressData && progressData.length > 0) {
      setProgress(() => {
        if (progressData[0].current_paragraph) {
          setLastPageProgress(progressData[0].current_paragraph ?? 0)
          setLastReadingTime(progressData[0].total_time_spent ?? 0)
          return { paragraph_no: progressData[0].current_paragraph, paragraph_id: progressData[0].paragraph_id }
        } else {
					setLastPageProgress(0)
          setLastReadingTime(0)
          return { paragraph_no: 0, paragraph_id: '' }
        }
      })
    } else {
			setLastPageProgress(0)
			setLastReadingTime(0)
      setProgress({ paragraph_no: 0, paragraph_id: '' })
    }
  }, [progressLoading, progressData, synopsis])

	if (!book || progressLoading || initalParagraphsLoading) {
		return (
			<View style={tw`flex-1 justify-center items-center bg-black`}>
				<ActivityIndicator size="large" color={light.activeIconColor} />
			</View>
		)
	}

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
					<View style={[tw`bg-transparent flex-1 flex-col-reverse pb-14 px-4 justify-start`]}>
						{/* {snapPoint === -1 ? <></> : <TouchableOpacity onPress={() => setSnapPoint(-1)} style={tw`bg-transparent flex-1`} />} */}
						<View style={tw`bg-transparent`}>
							{book?.creator_books?.[0]?.creators && ( <Author name={book.creator_books[0].creators.name} id={book.creator_books[0].creators.id} /> )}
							<QuickSandTextSemiBold
								style={tw`text-4xl p-2`}
								lightColor={light.activeIconColor}
								darkColor={dark.activeIconColor}
							>{book?.title}</QuickSandTextSemiBold>
							<ScrollView style={tw`max-h-1/2 my-2`} >
								<SpaceMonoTextRegular
									style={tw`text-sm p-2`}
									lightColor={dark.text}
									darkColor={dark.text}
								>{book?.description}</SpaceMonoTextRegular>
							</ScrollView>
							<InteractionOptions user_id={user?.id as string} book_id={book?.id as string} openAndClose={() => setModalVisible(true)}  />
							<TouchableOpacity
								activeOpacity={.8}
								style={[tw`flex flex-row mt-6 p-4 px-4 items-center justify-between w-7/12 rounded-full`, {
									backgroundColor: dark.text
								}]}
								onPress={() => {
									setSelectedBook(book as Book)
									if (progressLoading || initalParagraphsLoading) return
									if (!(progressData && progressData.length > 0)) {
										if (!initalParagraphs || initalParagraphs.length === 0) {
											console.warn('No paragraph found, cannot start reading')
											return
										}
										createInitialProgressMutation.mutate(undefined, {
											onSuccess: () => {
												router.push('/book/story')
											},
											onError: (err) => {
												throw new Error(err.message)
											}
										})
									} else {
										router.push('/book/story')
									}
								}}
							>
								<QuickSandTextSemiBold
									style={[tw`text-base w-auto`, {
										color: light.activeIconColor
									}]}
								>{progressLoading ? 'Loading...' : progress.paragraph_no > 1 ? 'Continue reading' : 'Start Reading'}</QuickSandTextSemiBold>
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
