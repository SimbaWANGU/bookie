import { View } from 'react-native'
import React from 'react'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { fetchOtherUser } from '@api/profile/api.user'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@constants/QueryKeys'

interface NamesProps {
  id?: string
}

const Names: React.FC<NamesProps> = () => {
  const [user] = useAtom(userAtom)

  return (
    <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandText style={tw`text-3xl text-accent/90 font-bold`}>{user?.name as string}</QuickSandText>
      <QuickSandText style={tw`text-base text-accent/40`}>{`@${user?.user_name as string}`}</QuickSandText>
    </View>
  )
}

export default Names