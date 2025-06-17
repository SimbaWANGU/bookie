import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import tw from '@utils/tailwind'
import { ReadingProgress } from '@models/useractivity.type'

interface FriendsProps {
  item: ReadingProgress
}

const Friends: React.FC<FriendsProps> = ({ item }) => {
  const book = item.books
  const user = item.users

  return (
    <View style={tw`items-center mx-2`}>
      <ImageBackground
        source={{ uri: book.cover_image_url }}
        style={tw`w-20 h-20 rounded-full overflow-hidden justify-end items-center`}
        imageStyle={tw`rounded-full`}
      >
        <View style={tw`bg-black bg-opacity-50 w-full px-1 py-0.5 rounded-b-full`}>
          <Text style={tw`text-white text-xs text-center`} numberOfLines={1}>
            {user.name.split(' ')[0]} 📖
          </Text>
        </View>
      </ImageBackground>

      <Text
        style={tw`mt-1 text-xs text-gray-700 text-center`}
        numberOfLines={2}
      >
        {book.title}
      </Text>
    </View>
  )
}

export default Friends