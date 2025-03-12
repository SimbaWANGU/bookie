import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getDynamicValue } from '@constants/Functions'
import tw from '@utils/tailwind'
import { FontAwesome } from '@expo/vector-icons'

interface BookCommentProps {
  openAndCloseComment: () => void
}

const BookComment: React.FC<BookCommentProps> = ({ openAndCloseComment }) => {
  return (
    <TouchableOpacity onPress={openAndCloseComment} style={tw`p-2`}>
      <FontAwesome
        name={'comment-o'}
        size={getDynamicValue(45)}
        color={'gray'}
      />
    </TouchableOpacity>
  )
}

export default BookComment