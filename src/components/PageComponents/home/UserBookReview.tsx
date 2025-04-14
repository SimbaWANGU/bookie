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
      style={tw`mb-1  p-4 rounded-lg shadow ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-black border border-gray-900'}`}
      activeOpacity={.8}  
    >
      <View style={[tw`flex-row items-center absolute`, {
        top: getDynamicValue(25),
        left: getDynamicValue(20)
      }]}>
        <TouchableOpacity
          style={tw`z-10`}
          activeOpacity={.8}
          onPress={() => { item.users.id === user?.id ? router.push('/profile') : router.push(`/usersprofile/${item.users.id}`) }}
        >
          <Image
            source={{ uri: item.users.avatar_url }}
            style={tw`h-12 w-12 rounded-full`}
            contentFit="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={[tw`self-end w-10/12`]}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-bold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
            <Text>{item.users.name}{' '}</Text>
            <Text style={tw`font-medium text-gray-500`}>reviewed{' '}</Text>
            {item.books.title}
          </Text>
        </View>
        <Text style={tw`mt-2 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
          {item.review}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default UserBookReview