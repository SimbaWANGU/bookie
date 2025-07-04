import { QuickSandTextRegular } from '@components/styled/StyledText'
import { userAtom } from '@stores/user.state'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React from 'react'
import { View } from 'react-native'

interface NamesProps {
  id?: string
}

const Names: React.FC<NamesProps> = () => {
  const [user] = useAtom(userAtom)

  return (
    <View style={tw`bg-transparent flex flex-col`}>
      <QuickSandTextRegular style={tw`text-3xl text-accent/90 font-bold`}>{user?.name as string}</QuickSandTextRegular>
      <QuickSandTextRegular style={tw`text-base text-accent/40`}>{`@${user?.user_name as string}`}</QuickSandTextRegular>
    </View>
  )
}

export default Names