import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useRef } from 'react'
import { CustomUser } from '@models/userProfile.type'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { LegendList, LegendListRef } from "@legendapp/list"

interface UsersSearchResultsProps {
  item: CustomUser[]
}

const UsersSearchResults: React.FC<UsersSearchResultsProps> = ({ item }) => {
  const theme = useColorScheme()
  const listRef = useRef<LegendListRef | null>(null)

  return (
    <LegendList
      ref={listRef}
      data={item}
      contentContainerStyle={tw`px-4`}
      keyExtractor={(item) => `${item.id}-${item.user_name}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: user }) => {
        return (
          <TouchableOpacity
            key={user.id}
            style={tw`flex-row items-center py-2`}
            onPress={() => router.push(`/usersprofile/${user.id}`) }
          >
            <Image
              source={{ uri: user.avatar_url }}
              style={tw`w-12 h-12 rounded-full mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-semibold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
                {user.name}
              </Text>
              <Text style={tw`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                @{user.user_name}
              </Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default UsersSearchResults