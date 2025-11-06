import { Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Story } from '@models/story.type'
import PagerView from 'react-native-pager-view'
import tw from '@utils/tailwind'
import { FetchNextPageOptions, FetchPreviousPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { bookAtom } from '@stores/books.state'
import { userAtom } from '@stores/user.state'
import { lastPageProgressAtom, progressAtom, readingStatusAtom } from '@stores/story.state'
import useReadingTracker from '@hooks/useReadingTracker'
import { pagerViewOrientationAtom } from '@stores/settings.state'
import Page from './Page'
import StoryNavigationButtons from './StoryNavigationButtons'

type StoryCarouselProps = {
  story: Story[]
  fetchPreviousPage: (options?: FetchPreviousPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<Story[], unknown>, Error>>
  hasPreviousPage: boolean
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<Story[], unknown>, Error>>
  hasNextPage: boolean
}

const StoryPagerView: React.FC<StoryCarouselProps> = ({ story, hasNextPage, fetchNextPage }) => {
  const lastFetchedIndexRef = useRef<number>(-1)
  const pagerRef = useRef<PagerView>(null)

  const [book] = useAtom(bookAtom)
  const [user] = useAtom(userAtom)
  const [progress] = useAtom(progressAtom)
  const [page, setPage] = useState(progress)
  const [lastPageProgress] = useAtom(lastPageProgressAtom)
  const [, setStatus] = useAtom(readingStatusAtom)
  const [pagerViewOrientation] = useAtom(pagerViewOrientationAtom)

  const [currentIndex, setCurrentIndex] = useState(() => {
    const initial = story.findIndex((p) => p.paragraph_no === lastPageProgress)
    return initial !== -1 ? initial : 0
  })

  const pageRef = useRef<{ paragraphId: string; paragraphNo: number } | null>(null)

  useEffect(() => {
    if (page?.paragraph_id && page?.paragraph_no !== undefined) {
      pageRef.current = {
        paragraphId: page.paragraph_id,
        paragraphNo: page.paragraph_no,
      }
    }
  }, [page])

  useReadingTracker({
    bookId: book?.id!,
    userId: user?.id!,
    getCurrentPage: () => pageRef.current!
  })

  story.sort((a, b) => a.paragraph_no - b.paragraph_no)

  const handlePageChange = (index: number) => {
    const currentParagraph = story[index]
    setCurrentIndex(index)
    setPage({ paragraph_no: currentParagraph.paragraph_no, paragraph_id: currentParagraph.id })

    const totalParagraphs = story.length
    const threshold = 3
    const shouldFetch = index >= totalParagraphs - threshold

    const pageGroup = Math.floor(totalParagraphs / 10)
    if (shouldFetch && hasNextPage && lastFetchedIndexRef.current < pageGroup) {
      fetchNextPage()
      lastFetchedIndexRef.current = pageGroup
    }

    const isAtLastParagraph = currentParagraph.paragraph_no === Math.max(...story.map(p => p.paragraph_no))
    if (!hasNextPage && isAtLastParagraph) {
      setStatus('COMPLETED')
    }
  }

  const onNext = () => {
    if (currentIndex < story.length - 1) {
      pagerRef.current?.setPage(currentIndex + 1)
    }
  }

  const onPrev = () => {
    if (currentIndex > 0) {
      pagerRef.current?.setPage(currentIndex - 1)
    }
  }

  return (
    <>
      <PagerView
        ref={pagerRef}
        style={tw`flex-1`}
        initialPage={currentIndex}
        orientation={pagerViewOrientation}
        collapsable={Platform.OS === 'android'}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {story.map((paragraph, index) => {
          const { content, paragraph_no, metadata } = paragraph
          return (
            <Page key={`${index}-${paragraph_no}`} content={content} metadata={metadata} />
          )
        })}
      </PagerView>

      <StoryNavigationButtons onNext={onNext} onPrev={onPrev} currentPage={page} />
    </>
  )
}

export default StoryPagerView