import { View } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import CompletedBooks from './CompletedBooks'
import LikedBooks from './LikedBooks'
import ReviewedBooks from './ReviewedBooks'
import InProgressBooks from './InProgress'

interface ContentAreaProps {
  selected: 'in progress' | 'completed' | 'liked' | 'reviews'
}

const ContentArea: React.FC<ContentAreaProps> = ({ selected }) => {

  return (
    <View style={tw`p-4 h-auto w-full flex-1 items-center justify-center`}>
      {selected === 'in progress' && (
        <InProgressBooks />
      )}
      {selected === 'liked' && (
        <LikedBooks />
      )}
      {selected === 'reviews' && (
        <ReviewedBooks />
      )}
      {selected === 'completed' && (
        <CompletedBooks />
      )}
    </View>
  )
}

export default ContentArea