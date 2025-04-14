import { View } from 'react-native'
import React from 'react'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { fetchOtherUser } from '@api/profile/api.user'
import { useQuery } from '@tanstack/react-query'

interface NamesProps {
  id?: string
}

const Names: React.FC<NamesProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const { data: otherUser } = useQuery({
    queryKey: ['other_user', id],
    queryFn: async () => await fetchOtherUser(id as string),
    enabled: !!id 
  })

  if (id) {
    return (
      <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandText style={tw`text-3xl text-accent/90 font-bold`}>{otherUser?.name as string}</QuickSandText>
      <QuickSandText style={tw`text-base text-accent/40`}>{`@${otherUser?.user_name as string}`}</QuickSandText>
    </View>
    )
  }

  return (
    <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandText style={tw`text-3xl text-accent/90 font-bold`}>{user?.name as string}</QuickSandText>
      <QuickSandText style={tw`text-base text-accent/40`}>{`@${user?.user_name as string}`}</QuickSandText>
    </View>
  )
}

export default Names