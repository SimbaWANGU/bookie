import React from 'react'
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { BookLiked } from '@models/useractivity.type'
import { router } from 'expo-router'
import { QuickSandText } from '@components/styled/StyledText'

interface UserBookLikedProps {
  item: BookLiked
}

const UserBookLiked: React.FC<UserBookLikedProps> = ({ item }) => {
  const theme = useColorScheme()
  const user = item.users
  const book = item.books

  return (
    <TouchableOpacity
      style={tw`mb-1 rounded-lg shadow overflow-hidden ${
        theme === 'light'
          ? 'bg-white border border-gray-200'
          : 'bg-black border border-gray-900'
      }`}
      activeOpacity={0.8}
      onPress={() => router.push(`/book/${book.id}`)}
    >
      {/* Book Cover Image */}
      <View style={tw`relative`}>
        <Image
          source={{ uri: book.cover_image_url }}
          style={tw`h-60 w-full`}
          contentFit="cover"
        />

        {/* Floating Avatar */}
        {user?.avatar_url && (
          <TouchableOpacity
            style={tw`absolute top-3 left-3 z-10`}
            activeOpacity={0.8}
            onPress={() => router.push(`/usersprofile/${user.id}`)}
          >
            <Image
              source={{ uri: user.avatar_url }}
              style={tw`h-12 w-12 rounded-full border-2 border-white`}
              contentFit="cover"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={tw`p-4 flex-row flex-wrap`}>
        <Text
          style={tw`text-base font-bold ${
            theme === 'light' ? 'text-dark' : 'text-light'
          }`}
        >
          {user.name}{' '}
        </Text>
        <Text style={tw`text-base ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
          liked{' '}
        </Text>
        <Text
          style={tw`text-base font-semibold ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-100'
          }`}
        >
          {book.title}
        </Text>

      </View>
    </TouchableOpacity>
  )
}

export default UserBookLiked