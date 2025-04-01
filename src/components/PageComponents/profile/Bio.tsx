import { View, Text } from 'react-native'
import React from 'react'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

const Bio = () => {
  const [user] = useAtom(userAtom)
  return (
    <View style={tw`bg-transparent my-2`}>
      <QuickSandText style={tw`text-sm`}>
        {user?.bio}
      </QuickSandText>
    </View>
  )
}

export default Bio