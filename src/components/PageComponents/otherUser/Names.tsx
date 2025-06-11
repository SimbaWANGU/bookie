import { View } from 'react-native'
import React from 'react'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { fetchOtherUser } from '@api/profile/api.user'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@constants/QueryKeys'

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
      <QuickSandText style={tw`text-3xl text-accent/90 font-bold`}>{otherUser?.name as string}</QuickSandText>
      <QuickSandText style={tw`text-base text-accent/40`}>{`@${otherUser?.user_name as string}`}</QuickSandText>
    </View>
  )
}

export default Names