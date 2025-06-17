import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { BookReview } from '@models/useractivity.type'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

interface UserBookReviewProps {
  item: BookReview
}

const UserBookReview: React.FC<UserBookReviewProps> = ({ item }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)

  return (
    <TouchableOpacity
      style={tw`mb-1 p-4 rounded-lg shadow ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-black border border-gray-900'}`}
      activeOpacity={0.8}
      onPress={() => router.push({
        pathname: `/book/[synopsis]`,
        params: { synopsis: item.book_id }
      })}
    >
      {/* Floating user avatar */}
      <View
        style={[
          tw`flex-row items-center absolute z-10`,
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
            item.users.id === user?.id
              ? router.push('/profile')
              : router.push(`/usersprofile/${item.users.id}`)
          }
        >
          <Image
            source={{ uri: item.users.avatar_url }}
            style={tw`h-12 w-12 rounded-full`}
            contentFit="cover"
          />
        </TouchableOpacity>
      </View>

      {/* User + Book title */}
      <View style={tw`self-end w-10/12`}>
        <Text style={tw`text-base font-bold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
          <Text>{item.users.name}{' '}</Text>
          <Text style={tw`font-medium text-gray-500`}>reviewed{' '}</Text>
          {item.books.title}
        </Text>
      </View>

      {/* Book cover + floating genres */}
      <View style={tw`mt-3 relative`}>
        <Image
          source={{ uri: item.books.cover_image_url }}
          style={tw`w-full h-48 rounded-lg`}
          contentFit="cover"
        />

        {/* Floating genres on top of image */}
        <View style={tw`absolute top-2 left-2 flex-row flex-wrap`}>
          {item.books.book_genres?.map((bg, idx) => (
            <View
              key={idx}
              style={tw`px-2 py-1 mr-1 mb-1 rounded-full bg-accent/90`}
            >
              <Text style={tw`text-xs font-bold text-light`}>
                {bg.genres.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Review text */}
      <Text style={tw`mt-3 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
        &apos;&apos;{item.review}&apos;&apos;
      </Text>
    </TouchableOpacity>
  )
}

export default UserBookReview