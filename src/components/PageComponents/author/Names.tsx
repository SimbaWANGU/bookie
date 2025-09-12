import { fetchAuthor } from '@api/profile/api.author'
import { fetchOtherUser } from '@api/profile/api.user'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Names = () => {
  const { author } = useLocalSearchParams()

  const { data, error, isLoading } = useQuery({
    queryKey: ['author', author as string],
    queryFn: async () => await fetchAuthor(author as string),
    enabled: !!author
  })

  if (isLoading || error || !data) {
    return null
  }

  return (
    <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandTextRegular style={tw`text-3xl text-accent/90 font-bold`}>{data.name as string}</QuickSandTextRegular>
      <QuickSandTextRegular style={tw`text-base text-accent/40`}>{`@${data.alias as string}`}</QuickSandTextRegular>
    </View>
  )
}

export default Names