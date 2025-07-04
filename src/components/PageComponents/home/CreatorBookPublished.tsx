import Audio from '@components/styled/Audio'
import Genre from '@components/styled/Genre'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { convertTime, getDynamicValue } from '@constants/Functions'
import { BookEntry } from '@models/useractivity.type'
import { timeFormatAtom } from '@stores/settings.state'
import { userAtom } from '@stores/user.state'
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

interface CreatorBookPublishedProps {
  item: BookEntry
}

const CreatorBookPublished: React.FC<CreatorBookPublishedProps> = ({ item }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)
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
        // navigate to creator’s page or book page
        router.push(
          item.creator_id === user?.id
            ? '/profile'
            : `/usersprofile/${item.creator_id}`
        )
      }}
    >
      {/* Avatar */}
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
          onPress={() =>
            item.creator_id === user?.id
              ? router.push('/profile')
              : router.push(`/usersprofile/${item.creator_id}`)
          }
        >
          <Image
            source={{ uri: item.creators.avatar_url }}
            style={tw`h-12 w-12 rounded-full`}
            contentFit="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Content block */}
      <View style={[tw`self-end w-10/12`]}>
        {/* Title line */}
        <View style={tw`flex-1`}>
          <Text
            style={tw`text-base font-bold ${
              theme === 'light' ? 'text-dark' : 'text-light'
            }`}
          >
            <Text>{item.creators.name}{' '}</Text>
            <Text style={tw`font-medium text-gray-500`}>
              published{' '}
            </Text>
            {item.books.title}
          </Text>
        </View>

        {/* Book cover */}
        <View>
          <Image
            source={{ uri: item.books.cover_image_url }}
            style={tw`mt-2 h-60 w-full rounded-md`}
            contentFit="cover"
          />
          {/* Genres */}
          <View style={tw`absolute bottom-2 mt-2 flex-row flex-wrap p-2`}>
            {item.books.book_genres.map((genre, index) => (
              <Genre genre={genre.genres.name} key={index} />
            ))}
          </View>
          {item.books.is_audio && (
            <Audio />
          )}
        </View>
        {/* Description preview */}
        <QuickSandTextRegular
          style={tw`mt-3 text-sm ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-400'
          }`}
        >
          {item.books.description}
        </QuickSandTextRegular>

        {/* Published date */}
        <QuickSandTextRegular
          style={tw`mt-2 text-xs italic ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-600'
          }`}
        >
          {convertTime(item.books.updated_at, is24Hr)}
        </QuickSandTextRegular>

      </View>
    </TouchableOpacity>
  )
}

export default CreatorBookPublished