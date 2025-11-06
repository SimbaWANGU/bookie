import { Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Author } from '@models/author.type'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { LegendList, LegendListRef } from '@legendapp/list'

interface AuthorsSearchResultsProps {
  item: Author[]
}

const AuthorsSearchResults: React.FC<AuthorsSearchResultsProps> = ({ item }) => {
  const listRef = useRef<LegendListRef | null>(null)

  return (
    <LegendList
      ref={listRef}
      data={item}
      contentContainerStyle={tw`px-4`}
      keyExtractor={(item) => `${item.id}-${item.alias}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: author }) => {
        return (
          <View style={tw`flex-row items-center py-2`}>
            <Image
              source={{ uri: author.avatar_url }}
              style={tw`w-12 h-12 rounded-full mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-semibold text-black dark:text-white`}>
                {author.name}
              </Text>
              <Text style={tw`text-sm text-gray-500 dark:text-gray-400`}>
                @{author.alias}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

export default AuthorsSearchResults