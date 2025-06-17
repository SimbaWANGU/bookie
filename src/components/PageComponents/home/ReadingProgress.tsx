import React from 'react'
import { View, Image } from 'react-native'
import tw from '@utils/tailwind'
import { ReadingProgress } from '@models/useractivity.type'
import { QuickSandText } from '@components/styled/StyledText'

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
          source={{ uri: book.cover_image_url }}
          style={tw`h-28 aspect-square rounded-full`}
          resizeMode="cover"
        />
        <Image
          source={{ uri: user.avatar_url }}
          style={tw`h-10 absolute self-center -bottom-2 aspect-square rounded-full`}
          resizeMode="cover"
        />
      </View>
      <QuickSandText style={tw``}>
        {user.name}
      </QuickSandText>
     </View>
  )
}

export default UserStartedReading