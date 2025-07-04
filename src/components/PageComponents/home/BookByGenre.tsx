import Audio from '@components/styled/Audio'
import Genre from '@components/styled/Genre'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { convertTime, getDynamicValue } from '@constants/Functions'
import { BookByGenre } from '@models/useractivity.type'
import { timeFormatAtom } from '@stores/settings.state'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native'

interface BookByGenreCardProps {
  item: BookByGenre
}

const BookByGenreCard: React.FC<BookByGenreCardProps> = ({ item }) => {
  const theme = useColorScheme()
  const creator = item.creator_books[0]?.creators
  const [is24Hr] = useAtom(timeFormatAtom)

  return (
    <TouchableOpacity
      style={tw`mb-1 p-4 rounded-lg shadow ${
        theme === 'light'
          ? 'bg-white border border-gray-200'
          : 'bg-black border border-gray-900'
      }`}
      activeOpacity={0.8}
      onPress={() => {
        if (creator?.id) {
          router.push(`/usersprofile/${creator.id}`)
        }
      }}
    >
      {/* Avatar */}
      {creator?.avatar_url && (
        <View
          style={[
            tw`flex-row items-center absolute`,
            {
              top: getDynamicValue(25),
              left: getDynamicValue(20),
            },
          ]}
        >
          <TouchableOpacity
            style={tw`z-10`}
            activeOpacity={0.8}
            onPress={() => {
              if (creator?.id) {
                router.push(`/usersprofile/${creator.id}`)
              }
            }}
          >
            <Image
              source={{ uri: creator.avatar_url }}
              style={tw`h-12 w-12 rounded-full`}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Content block */}
      <View style={[tw`self-end w-10/12`]}>
        {/* Title */}
        <View>
          <Text
            style={tw`text-base font-bold ${
              theme === 'light' ? 'text-dark' : 'text-light'
            }`}
          >
            <Text style={tw`font-medium text-gray-500`}>
              You might like{' '}
            </Text>
            {item.title}{' '}
            <Text>by {creator?.name}{' '}</Text>
          </Text>
        </View>

        {/* Book cover */}
        <View>
          <Image
            source={{ uri: item.cover_image_url }}
            style={tw`mt-2 h-60 w-full rounded-md`}
            contentFit="cover"
          />

          {/* Genres */}
          <View style={tw`absolute bottom-2 mt-2 flex-row flex-wrap p-2`}>
            {item.book_genres?.map((genre, index) => (
              <Genre genre={genre.genres.name} key={index} />
            ))}
          </View>

          {/* Audio badge */}
          {item.is_audio && <Audio />}
        </View>

        {/* Description */}
        <QuickSandTextRegular
          style={tw`mt-3 text-sm ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-400'
          }`}
        >
          {item.description}
        </QuickSandTextRegular>

        {/* Date */}
        <QuickSandTextRegular
          style={tw`mt-2 text-xs italic ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          {convertTime(item.updated_at, is24Hr)}
        </QuickSandTextRegular>
      </View>
    </TouchableOpacity>
  )
}

export default BookByGenreCard