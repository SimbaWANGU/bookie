import React, { useEffect, useState } from 'react'
import { View, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Controller, useForm } from 'react-hook-form'
import { Image } from 'expo-image'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import tw from '@utils/tailwind'
import { createReview, fetchReviews } from '@api/books/api.reviews'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import ShimmerPlaceHolder from '@components/styled/Shimmer'
import Reviewsheader from '@components/headers/reviewsheader'
import { BookReview } from '@models/reviews.type'
import ReviewInput from './ReviewInput'
import { supabase } from '@utils/supabase'

interface BottomSheetViewProps {
  book_id: string
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
}

const BottomSheetView: React.FC<BottomSheetViewProps> = ({ book_id, modalVisible, setModalVisible }) => {
  const insets = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const { data: reviews, isLoading, error } = useQuery<BookReview[]>({
    queryKey: ['reviews', book_id],
    queryFn: () => fetchReviews(book_id)
  })

  useEffect(() => {
    const subscription = supabase.channel('review-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_reviews_book' },
        async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
          await queryClient.invalidateQueries({ queryKey: ['reviews'] })
        }
      ).subscribe()

      return () => {
        supabase.removeChannel(subscription)
      }
  }, [])

  console.log(reviews, isLoading, error)

  // If reviews data is undefined, return nothing
  if (reviews === undefined) return null

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={tw`p-4 pb-32`} // Extra bottom padding for the fixed input box
        enableOnAndroid={true}
      >
        {/* Header */}
        <Reviewsheader setModalVisible={setModalVisible} />

        {/* Comments List */}
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={tw`rounded-lg px-2 my-4 flex-row items-start`}>
                <ShimmerPlaceHolder style={tw`w-12 h-12 rounded-full mr-3`} />
                <View style={tw`flex-1 justify-center`}>
                  <ShimmerPlaceHolder style={tw`h-4 w-20 rounded`} />
                  <ShimmerPlaceHolder style={tw`mt-3 h-10 w-10/12 rounded`} />
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            {reviews.map((item) => (
              <View
                key={`${item.book_id}-${item.user_id}`}
                style={tw`rounded-lg px-2 my-4 flex-row items-start`}
              >
                <Image
                  source={{
                    uri: 'https://ui-avatars.com/api/?name=U+N'
                  }}
                  style={tw`w-12 h-12 rounded-full mr-3`}
                />
                <View style={tw`flex-1`}>
                  <MonoText style={tw`text-gray-400`}>
                    {item.users?.name || item.users?.user_name || 'username'}
                  </MonoText>
                  <QuickSandText style={tw`mt-1 text-gray-600`}>
                    {item.review}
                  </QuickSandText>
                </View>
              </View>
            ))}
          </>
        )}
      </KeyboardAwareScrollView>

      {/* Fixed Footer: Input Box wrapped in its own KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.bottom + 10}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <ReviewInput book_id={book_id} />
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default BottomSheetView