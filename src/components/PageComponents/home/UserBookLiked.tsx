import { View, Text } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { BookLiked } from '@models/useractivity.type'

interface UserBookLikedProps {
  item: BookLiked
}

const UserBookLiked: React.FC<UserBookLikedProps> = ({ item }) => {
  return (
    <View style={tw`mb-4 p-4 border border-gray-300 rounded`}>
      <Text style={tw`font-bold`}>{item.users.name} liked</Text>
      <Text>{item.books.title}</Text>
    </View>
  )
}

export default UserBookLiked