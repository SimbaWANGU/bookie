import { View, Text } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { BookReview } from '@models/useractivity.type'

interface UserBookReviewProps {
  item: BookReview
}

const UserBookReview: React.FC<UserBookReviewProps> = ({ item }) => {
  return (
    <View style={tw`mb-4 bg-white p-4 border border-gray-200 rounded-lg shadow`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={{ uri: item.users.avatar_url }}
          style={tw`h-12 w-12 rounded-full`}
          contentFit="cover"
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-lg font-bold`}>
            {item.users.name}{' '}
            <Text style={tw`font-medium text-gray-600`}>reviewed</Text>{' '}
            {item.books.title}
          </Text>
        </View>
      </View>
      <Text style={tw`mt-2 text-base text-gray-700`}>
        {item.review}
      </Text>
    </View>
  )
}

export default UserBookReview