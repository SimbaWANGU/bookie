import React, { useRef } from 'react'
import {
  Image,
  useColorScheme,
  PanResponder,
  Animated,
  Dimensions,
  Pressable
} from 'react-native'
import { currentRead } from '@api/books/api.currentRead'
import { calculateElapsedPercentage, getDynamicValue } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { Book } from '@models/book.type'
import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const SIZE = getDynamicValue(150)
const MARGIN = 20
const { width: screenWidth } = Dimensions.get('window')

const ContinueReading = () => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)
  const progressRef = useRef<AnimatedCircularProgress>(null)

  const position = useRef(
    new Animated.ValueXY({ x: screenWidth - SIZE - MARGIN, y: getDynamicValue(1000) })
  ).current

  const { data: book, isLoading, error } = useQuery({
    queryKey: [QueryKeys.currentRead],
    queryFn: async () => await currentRead(user?.id as string),
    staleTime: 0
  })

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5,
      onPanResponderGrant: () => {
        position.setOffset({ x: position.x._value, y: position.y._value })
        position.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: () => {
        position.flattenOffset()
        const currentX = position.x._value

        const leftX = MARGIN
        const rightX = screenWidth - SIZE - MARGIN

        const snapToRight = Math.abs(currentX - rightX) < Math.abs(currentX - leftX)

        Animated.spring(position, {
          toValue: {
            x: snapToRight ? rightX : leftX,
            y: getDynamicValue(1000)
          },
          useNativeDriver: false
        }).start()
      }
    })
  ).current

  if (isLoading || error || !book || book.length === 0) return null

  const lastRead: Book = book[0].books

  const handlePress = () => {
    if (lastRead.is_audio) {
      router.push(`/audio/${lastRead.id}`)
    } else {
      router.push(`/book/${lastRead.id}`)
    }
  }

  return (
    <Animated.View
      style={[
        position.getLayout(),
        tw`absolute card rounded-full ${theme === 'light' ? 'opacity-90' : 'opacity-80'}`
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={handlePress}
        android_ripple={{ color: '#198d9e11' }}
        style={tw`rounded-full overflow-hidden`}
      >
        <AnimatedCircularProgress
          ref={progressRef}
          size={SIZE}
          width={getDynamicValue(4)}
          rotation={0}
          fill={calculateElapsedPercentage(
            book[0].current_paragraph as number,
            book[0].books.story_paragraphs_count?.[0]?.count as number
          )}
          tintColor={'#198D9E'}
          backgroundColor='#f0f0f0'
          lineCap='round'
        >
          {() => (
            <Image
              source={{ uri: lastRead.cover_image_url }}
              style={tw`aspect-square h-full rounded-full z-10`}
            />
          )}
        </AnimatedCircularProgress>
      </Pressable>
    </Animated.View>
  )
}

export default ContinueReading