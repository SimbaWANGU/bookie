import { View, Text } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { BookEntry } from '@models/useractivity.type'

interface CreatorBookPublishedProps {
  item: BookEntry
}

const CreatorBookPublished: React.FC<CreatorBookPublishedProps> = ({ item }) => {
  return (
    <View style={tw`mb-4 p-4 border border-gray-300 rounded`}>
      <Text style={tw`font-bold`}>{item.creators.name} published</Text>
      <Text>{item.books.title}</Text>
    </View>
  )
}

export default CreatorBookPublished