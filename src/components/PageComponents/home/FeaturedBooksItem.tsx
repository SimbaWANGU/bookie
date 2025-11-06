import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import Genre from '@components/styled/Genre'
import {
  QuickSandTextBold,
  SpaceMonoTextItalic
} from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark } from '@constants/Color'
import { Book } from '@models/book.type'
import tw from '@utils/tailwind'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle
} from 'react-native-reanimated'
import Author from './Author'

interface ItemProps {
  index: number
  animationValue: SharedValue<number>
  book: Book
}

const FeaturedBooksItem: React.FC<ItemProps> = ({ animationValue, book }) => {
  const { book_genres, creator_books } = book

  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd']
    )
    return { backgroundColor }
  }, [animationValue])

  const handlePress = () => {
    if (book.is_audio) {
      router.push(`/audio/${book.id}`)
    } else {
      router.push(`/book/${book.id}`)
    }
  }

  return (
    <Pressable onPress={handlePress} style={tw`flex-1 rounded`}>
      <Animated.View style={[tw`flex-1 rounded`, maskStyle]}>
        <ImageBackground
          source={{ uri: book.cover_image_url as string }}
          contentFit='cover'
          style={tw`flex-1 rounded`}
        >
          <LinearGradient
            colors={['transparent', 'black']}
            locations={[0.2, 0.9]}
            style={tw`flex-1 justify-end rounded p-6`}
          >
            <View style={tw`z-10 bg-transparent gap-2`}>
							<Author uri={creator_books?.[0].creators.avatar_url as string} name={creator_books?.[0].creators.name as string} id={creator_books?.[0].creators.id as string} />
              <QuickSandTextBold
                style={tw`text-2xl text-light`}
              >
                {book.title}
              </QuickSandTextBold>

              <View style={tw`flex flex-row flex-wrap bg-transparent`}>
                {book_genres?.map((item, index) => (
                  <Genre key={index} genre={item.genres.name} />
                ))}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  )
}

export default FeaturedBooksItem