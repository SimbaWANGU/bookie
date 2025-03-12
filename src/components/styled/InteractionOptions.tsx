import React from 'react'
import { View } from 'react-native'
import tw from '@utils/tailwind'
import { BlurView } from 'expo-blur'
import Like from '@components/icons/Like'
import Bookmark from '@components/icons/Bookmark'
// import Reaction from '@components/icons/Reaction'
import BookComment from '@components/icons/BookComment'

type InteractionOptionsProps = {
  user_id: string
  book_id: string
  openAndClose: () => void
}

const InteractionOptions: React.FC<InteractionOptionsProps> = ({ user_id, book_id, openAndClose }) => {
  return (
    <BlurView intensity={10} style={[tw`p-2 rounded-full`, { overflow: 'hidden' }]}>
      <View style={tw`flex-row items-center justify-around rounded-full`}>
        <Like user_id={user_id} book_id={book_id} />
        <Bookmark user_id={user_id} book_id={book_id} />
        <BookComment openAndCloseComment={openAndClose} />
        
      </View>
    </BlurView>
  )
}

export default InteractionOptions