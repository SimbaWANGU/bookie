import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Book } from '@models/book.type'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'

interface BooksSearchResultsProps {
  item: Book[]
}

const BooksSearchResults: React.FC<BooksSearchResultsProps> = ({ item }) => {
  return (
    <FlatList
      data={item}
      contentContainerStyle={tw`px-4`}
      keyExtractor={(item) => `${item.id}-${item.title}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: book }) => {
        return (
          <View style={tw`flex-row p-4 border-b border-gray-200 dark:border-gray-700`}>
            <Image
              source={{ uri: book.cover_image_url }}
              style={tw`w-16 h-24 rounded mr-4 bg-gray-300`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-semibold text-black dark:text-white`}>
                {book.title}
              </Text>
              {book.is_audio && (
                <Text style={tw`text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1`}>
                  🎧 Audio Book
                </Text>
              )}
              <Text
                style={tw`text-sm text-gray-600 dark:text-gray-300 mt-1`}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {book.description}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

export default BooksSearchResults