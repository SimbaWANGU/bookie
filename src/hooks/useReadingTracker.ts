import { useFocusEffect } from 'expo-router'
import { AppState, AppStateStatus } from 'react-native'
import { useRef, useCallback, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReadingProgress } from '@api/story/api.progress'
import { readingStatusAtom, timeTakenInBookAtom } from '@stores/story.state'
import { useAtom } from 'jotai'
import { QueryKeys } from '@constants/QueryKeys'

type UseReadingTrackerOptions = {
  bookId: string
  userId: string
  getCurrentPage: () => { paragraphId: string; paragraphNo: number }
}
//! set cap for maximum time a user can spend on a paragraph

interface Progress {
  book_id: string
  user_id: string
  paragraph_id: string
  paragraph_no: number
  started_at: Date
  last_updated_at: Date
  completed_at: Date
  total_time_spent: number
  status: string
}

const MIN_READING_SECONDS = 30
// const MAX_READING_SECONDS = 180

const useReadingTracker = ({ bookId, userId, getCurrentPage }: UseReadingTrackerOptions) => {
  const startTime = useRef<number | null>(null)
  const accumulatedTime = useRef(0)
  const appStateRef = useRef(AppState.currentState)
  const [last, setLast] = useAtom(timeTakenInBookAtom)
  const [status] = useAtom(readingStatusAtom)
  const queryClient = useQueryClient()

  const updateProgressMutation = useMutation({
    mutationKey: ['update-progress', bookId, userId],
    mutationFn: (progress: Progress) => updateReadingProgress(progress, status),
    onSuccess: () => setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.initialProgress, QueryKeys.inProgressBooks, QueryKeys.completedBooks] })
    }, 1000),
    onError: (err) => {
      throw new Error(err.message)
    }
  })

  const resume = () => {
    if (startTime.current === null) {
      startTime.current = Date.now()
    }
  }

  const pause = () => {
    if (startTime.current !== null) {
      accumulatedTime.current += Date.now() - startTime.current
      startTime.current = null
    }
  }

  const commit = () => {
    const totalMs = accumulatedTime.current
    const totalSeconds = Math.floor(totalMs / 1000)

    // Send update only if it's >= 30 seconds
    if (totalSeconds >= MIN_READING_SECONDS) {
      // const cappedSeconds = Math.min(totalSeconds, MAX_READING_SECONDS)
      const { paragraphId, paragraphNo } = getCurrentPage()

      updateProgressMutation.mutate({
        book_id: bookId,
        user_id: userId,
        paragraph_id: paragraphId,
        paragraph_no: paragraphNo,
        started_at: new Date(),
        last_updated_at: new Date(),
        completed_at: new Date(),
        total_time_spent: last + totalSeconds,
        status: status,
      })

      setLast(prev => prev + totalSeconds)
    }

    accumulatedTime.current = 0
  }

  useFocusEffect(
    useCallback(() => {
      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appStateRef.current === 'active' && nextAppState !== 'active') {
          pause()
        } else if (appStateRef.current !== 'active' && nextAppState === 'active') {
          resume()
        }
        appStateRef.current = nextAppState
      }

      const subscription = AppState.addEventListener('change', handleAppStateChange)
      resume()

      return () => {
        pause()
        commit()
        subscription.remove()
      }
    }, [bookId, userId])
  )
}

export default useReadingTracker