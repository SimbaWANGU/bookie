import { Dimensions, Platform } from 'react-native'
import { View } from '@components/styled/Themed'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Story } from '@models/story.type'
import PagerView from 'react-native-pager-view'
import tw from '@utils/tailwind'
import { QuickSandText, MonoText } from '@components/styled/StyledText'
import { updateReadingProgress } from '@api/story/api.progress'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { bookAtom } from '@stores/books.state'
import { userAtom } from '@stores/user.state'
import { useFocusEffect } from 'expo-router'
import { progressAtom } from '@stores/story.state'

type StoryCarouselProps = {
  story: Story[]  // A flat list of paragraphs
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<Story[], unknown>, Error>>
  hasNextPage: boolean
}

const PAGE_WIDTH = Dimensions.get('window').width

const StoryPagerView: React.FC<StoryCarouselProps> = ({ story }) => {
  const [book] = useAtom(bookAtom)
  const [user] = useAtom(userAtom)
  const [progress] = useAtom(progressAtom)
  const [page, setPage] = useState(progress)

  // Create a ref to always hold the latest page state
  const pageRef = useRef(page)
  useEffect(() => {
    pageRef.current = page
  }, [page, book])

  // Sort story paragraphs by their number
  story.sort((a, b) => a.paragraph_no - b.paragraph_no)

  // Mutation: Update reading progress record
  const updateProgressMutation = useMutation({
    mutationKey: ['update-progress', book?.id, user?.id],
    mutationFn: (progress: {
      book_id: string
      paragraph_id: string
      paragraph_no: number
      user_id: string
      started_at: Date
      last_updated_at: Date
      completed_at: Date
      total_time_spent: number
      status: string
    }) => updateReadingProgress(progress)
  })

  useFocusEffect(
    useCallback(() => {
      return () => {
        updateProgressMutation.mutate({
          book_id: book?.id as string,
          paragraph_id: pageRef.current.paragraph_id,
          paragraph_no: pageRef.current.paragraph_no,
          user_id: user?.id as string,
          started_at: new Date(),
          last_updated_at: new Date(),
          completed_at: new Date(),
          total_time_spent: 20,
          status: 'UPDATED'
        })
      }
    }, [book])
  )

  return (
    <PagerView
      style={tw`flex-1`}
      initialPage={progress.paragraph_no - 1}
      collapsable={Platform.OS === 'android'}
      // onPageScroll={(e) => {
      //   // ? what if user stops reading at page above 7?
      //   if (e.nativeEvent.position + 1 % 10 === 7 && hasNextPage) {
      //     fetchNextPage()
      //   }
      // }}
      onPageSelected={e => {
        setPage({
          paragraph_no: e.nativeEvent.position + 1,
          paragraph_id: story.find((a) => a.paragraph_no === e.nativeEvent.position + 1)?.id as string
        })
      }}
    >
      {story.map((paragraph, index) => {
        const { content, paragraph_no } = paragraph
        return (
          <View
            key={`${index}-${paragraph_no}`}
            style={[tw`flex-1 justify-center items-center bg-background-color`, {
              width: PAGE_WIDTH
            }]}
          >
            {content.length < 50 ? (
              <QuickSandText style={tw`light:text-dark dark:text-light text-center text-4xl w-11/12`}>
                {content}
              </QuickSandText>
            ) : (
              <MonoText style={tw`light:text-dark dark:text-light text-center w-full p-2 text-xl`}>
                {content}
              </MonoText>
            )}
          </View>
        )
      })}
    </PagerView>
  )
}

export default StoryPagerView