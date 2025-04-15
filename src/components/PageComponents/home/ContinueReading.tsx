import { currentRead } from '@api/books/api.currentRead'
import { calculateElapsedPercentage, getDynamicValue } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { Book } from '@models/book.type'
import { userAtom } from '@stores/user.state'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import tw from '@utils/tailwind'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const ContinueReading = () => {
  const queryClient = useQueryClient()
  const [user] = useAtom(userAtom)
  const progressRef = useRef<AnimatedCircularProgress>(null)
  const { data: book, isLoading, error } = useQuery({
    queryKey: [QueryKeys.currentRead],
    queryFn: async () => await currentRead(user?.id as string),
    staleTime: 0
  })

  useEffect(() => {
    const subscription = supabase.channel('progress-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_reading_progress', filter: `user_id=eq.${user?.id}` },
        async () => {
          await new Promise(resolve => setTimeout(resolve, 50))
          await queryClient.invalidateQueries({ queryKey: [QueryKeys.currentRead] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])
  
  if (isLoading || error || !book || book.length === 0) {
    return null
  }

  const lastRead: Book = book[0].books
  
  return (
    <TouchableOpacity
      onPress={() => {
        if (lastRead.is_audio) {
          router.push(`/audio/${lastRead.id}`)
        }
        router.push(`/book/${lastRead.id}`)}}
      style={tw`absolute bottom-28 right-6 card rounded-full`}
      activeOpacity={0.8}
    >
      <AnimatedCircularProgress
        ref={progressRef}
        size={getDynamicValue(150)}
        width={getDynamicValue(4)}
        rotation={0}
        fill={calculateElapsedPercentage(book[0].current_paragraph as number, book[0].books.story_paragraphs_count[0].count as number)}
        tintColor={'#198D9E'}
        backgroundColor='#f0f0f0'
        lineCap='round'
      >
        {() => 
          <Image
            source={{ uri: lastRead.cover_image_url }}
            style={tw`aspect-square h-full rounded-full z-10`}
          />
          }  
      </AnimatedCircularProgress>
    </TouchableOpacity>
  )
}

export default ContinueReading