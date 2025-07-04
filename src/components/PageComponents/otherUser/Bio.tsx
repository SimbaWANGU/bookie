import { fetchOtherUser } from '@api/profile/api.user'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { QueryKeys } from '@constants/QueryKeys'
import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React from 'react'
import { View } from 'react-native'

interface BioProps {
  id?: string
}

const Bio: React.FC<BioProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const { data: otherUser } = useQuery({
    queryKey: [QueryKeys.otherUser, id ?? user?.id],
    queryFn: async () => await fetchOtherUser(id ?? user?.id as string),
  })

  if (id !== user?.id) {
    return (
      <View style={tw`bg-transparent my-2`}>
      <QuickSandTextRegular style={tw`text-sm`}>
        {otherUser?.bio}
      </QuickSandTextRegular>
    </View>
    )
  }

  return (
    <View style={tw`bg-transparent my-2`}>
      <QuickSandTextRegular style={tw`text-sm`}>
        {user?.bio}
      </QuickSandTextRegular>
    </View>
  )
}

export default Bio