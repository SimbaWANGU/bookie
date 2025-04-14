import { View } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import CompletedBooks from './CompletedBooks'
import LikedBooks from './LikedBooks'
import ReviewedBooks from './ReviewedBooks'
import InProgressBooks from './InProgress'

interface ContentAreaProps {
  id?: string
  selected: 'in progress' | 'completed' | 'liked' | 'reviews'
}

const ContentArea: React.FC<ContentAreaProps> = ({ id, selected }) => {

  return (
    <View style={tw`p-4 h-auto w-full flex-1 items-center justify-center`}>
      {selected === 'in progress' && (
        <InProgressBooks id={id} />
      )}
      {selected === 'liked' && (
        <LikedBooks id={id} />
      )}
      {selected === 'reviews' && (
        <ReviewedBooks id={id} />
      )}
      {selected === 'completed' && (
        <CompletedBooks id={id} />
      )}
    </View>
  )
}

export default ContentArea