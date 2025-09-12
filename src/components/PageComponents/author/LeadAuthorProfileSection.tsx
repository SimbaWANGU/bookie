import { View, useColorScheme } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchAuthor } from '@api/profile/api.author'
import ProfilePicture from './ProfilePicture'
import { QuickSandTextRegular } from '@components/styled/StyledText'

const LeadAuthorProfileSection = () => {
  const theme = useColorScheme()
  const { author } = useLocalSearchParams()
  const { data, error, isLoading } = useQuery({
    queryKey: ['author', author as string],
    queryFn: async () => await fetchAuthor(author as string),
    enabled: !!author
  })

  const totalBooks = data?.books_count?.[0]?.count ?? 0;
  const totalLikes = data?.liked_count?.reduce((sum, item) => {
    const count = item?.books?.user_likes_book?.[0]?.count || 0;
    return sum + count;
  }, 0) ?? 0;

  return (
    <View style={tw`self-start flex flex-row shadow mt-2 p-2 w-full bg-transparent`}>
      <ProfilePicture  />

      <View style={tw`flex-1 ml-4 justify-end`}>
        {/* New component displaying the three counts */}
        <View style={tw`flex-row justify-around mb-2 my-auto`}>
          <View style={tw`items-center`}>
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {data?.users_following_count}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Followers
            </QuickSandTextRegular>
          </View>
          <View style={tw`items-center`}>
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {totalBooks}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Books
            </QuickSandTextRegular>
          </View>
          <View style={tw`items-center`}>
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {totalLikes}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Likes
            </QuickSandTextRegular>
          </View>
        
        </View>
      </View>
    </View>
  )
}

export default LeadAuthorProfileSection