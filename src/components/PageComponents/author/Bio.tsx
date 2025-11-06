import { fetchAuthor } from '@api/profile/api.author'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Bio = () => {
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
    <View style={tw`bg-transparent my-2`}>
      <QuickSandTextRegular style={tw`text-sm`}>
        {data.bio ? data.bio : "Shy author alert — no bio yet!"}
      </QuickSandTextRegular>
    </View>
  )
}

export default Bio