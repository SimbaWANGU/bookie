import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { CustomUser } from '@models/userProfile.type'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'

interface UsersSearchResultsProps {
  item: CustomUser[]
}

const UsersSearchResults: React.FC<UsersSearchResultsProps> = ({ item }) => {
  return (
    <FlatList
      data={item}
      contentContainerStyle={tw`px-4`}
      keyExtractor={(item) => `${item.id}-${item.user_name}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: user }) => {
        return (
          <View style={tw`flex-row items-center py-2`}>
            <Image
              source={{ uri: user.avatar_url }}
              style={tw`w-12 h-12 rounded-full mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-semibold text-black dark:text-white`}>
                {user.name}
              </Text>
              <Text style={tw`text-sm text-gray-500 dark:text-gray-400`}>
                @{user.user_name}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

export default UsersSearchResults