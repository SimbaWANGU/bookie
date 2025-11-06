import { QuickSandTextRegular } from '@components/styled/StyledText'
import { ReadingProgress } from '@models/useractivity.type'
import tw from '@utils/tailwind'
import React from 'react'
import { Image, View } from 'react-native'

interface UserStartedReadingProps {
  item: ReadingProgress
}

const UserStartedReading: React.FC<UserStartedReadingProps> = ({ item }) => {
  const book = item.books
  const user = item.users

  return (
    <View style={tw`flex flex-col items-center justify-center gap-2 mb-4 rounded-full`}>
      <View>
        <Image
          source={{ uri: book?.cover_image_url }}
          style={tw`h-28 aspect-square rounded-full`}
          resizeMode="cover"
        />
        <Image
          source={{ uri: user?.avatar_url }}
          style={tw`h-10 absolute self-center -bottom-2 aspect-square rounded-full`}
          resizeMode="cover"
        />
      </View>
      <QuickSandTextRegular style={tw``}>
        {user?.name}
      </QuickSandTextRegular>
     </View>
  )
}

export default UserStartedReading