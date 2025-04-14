import { View } from 'react-native'
import React from 'react'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { fetchOtherUser } from '@api/profile/api.user'
import { useQuery } from '@tanstack/react-query'

interface BioProps {
  id?: string
}

const Bio: React.FC<BioProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const { data: otherUser } = useQuery({
    queryKey: ['other_user', id ?? user?.id],
    queryFn: async () => await fetchOtherUser(id ?? user?.id as string),
  })

  if (id !== user?.id) {
    return (
      <View style={tw`bg-transparent my-2`}>
      <QuickSandText style={tw`text-sm`}>
        {otherUser?.bio}
      </QuickSandText>
    </View>
    )
  }

  return (
    <View style={tw`bg-transparent my-2`}>
      <QuickSandText style={tw`text-sm`}>
        {user?.bio}
      </QuickSandText>
    </View>
  )
}

export default Bio