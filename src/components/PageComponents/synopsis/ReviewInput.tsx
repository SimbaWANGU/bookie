import { View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { Controller, useForm } from 'react-hook-form'
import Ionicons from '@expo/vector-icons/Ionicons'
import { createReview } from '@api/books/api.reviews'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

interface ReviewInputProps {
  book_id: string
}

const ReviewInput: React.FC<ReviewInputProps> = ({ book_id }) => {
  const [user] = useAtom(userAtom)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newReview: '' }
  })

  const onSubmit = (data: { newReview: string }) => {
    // Here you can call your API to submit the review.
    createReviewMutation.mutate(data.newReview)
    reset()
  }

  const createReviewMutation = useMutation({
    mutationKey: ['create-review', book_id],
    mutationFn: (reviewText: string) => createReview(user?.id as string, book_id, reviewText)
  })
  
  return (
    <View
      style={[
        tw`absolute h-28 left-0 right-0 bg-white p-4 border-t border-gray-200`,
        { bottom: 0 }
      ]}
    >
      <View style={tw`flex-row items-center justify-between`}>
        <Controller
          control={control}
          name="newReview"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`flex-1 h-14 rounded-full px-4 py-2 bg-gray-100`}
              placeholder="Add a review..."
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          style={tw`ml-4 w-12 h-12 bg-accent items-center justify-center rounded-full`}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Ionicons name="send" style={tw`text-light`} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReviewInput