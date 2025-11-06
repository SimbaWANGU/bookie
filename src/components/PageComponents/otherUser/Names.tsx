import { fetchOtherUser } from '@api/profile/api.user'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import React from 'react'
import { View } from 'react-native'

interface NamesProps {
  id?: string
}

const Names: React.FC<NamesProps> = ({ id }) => {
  const { data: otherUser } = useQuery({
    queryKey: [QueryKeys.otherUser, id],
    queryFn: async () => await fetchOtherUser(id as string),
    enabled: !!id
  })

  return (
    <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandTextRegular style={tw`text-3xl text-accent/90 font-bold`}>{otherUser?.name as string}</QuickSandTextRegular>
      <QuickSandTextRegular style={tw`text-base text-accent/40`}>{`@${otherUser?.user_name as string}`}</QuickSandTextRegular>
    </View>
  )
}

export default Names