import { View, Text, Modal, ActivityIndicator, FlatList, useColorScheme } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useAtom } from 'jotai'
import { reviewedFeedBook } from '@stores/feed.state'
import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import { getFeedItemReviewed } from '@api/activity/api.homeactivity'
import ModalHeader from '@components/headers/modalsHeader'
import tw from '@utils/tailwind'
import { ReviewedBookFeedEntry } from '@models/feed.type'
import { Image } from 'expo-image'

interface BottomSheetReviews {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const BookReviews: React.FC<BottomSheetReviews> = ({ isVisible, setIsVisible }) => {
  const theme = useColorScheme()
  const [reviewedBook, setReviewedBook] = useAtom(reviewedFeedBook)

  const { data = [], isLoading } = useQuery({
    queryKey: [QueryKeys.feedBookLikes, reviewedBook],
    queryFn: async () => await getFeedItemReviewed(reviewedBook),
    enabled: !!reviewedBook
  })

  useEffect(() => {
    return () => {
      setReviewedBook('')
    }
  }, [])

  const renderItem = ({ item }: { item: ReviewedBookFeedEntry }) => {
    const user = item.user
  
    return (
      <View style={tw`px-4 py-3 border-b ${theme === 'light' ? 'border-gray-100' : 'border-gray-800'} flex-row gap-4`}>
        {/* Avatar */}
        <Image
          source={{ uri: user.avatar_url }}
          style={tw`w-10 h-10 rounded-full bg-gray-300`}
        />
  
        {/* Content */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold ${theme === 'light' ? 'text-dark/80' : 'text-light'}`}>
            {user.name}
          </Text>
          <Text style={tw`text-sm ${theme === 'light' ? 'text-dark/70' : 'text-gray-400'}`}>
            @{user.user_name}
          </Text>
          <Text style={tw`mt-2 text-[15px] leading-5 ${theme === 'light' ? 'text-dark/90' : 'text-gray-300'}`}>
            {item.review}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Modal
      animationType='slide'
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ModalHeader setModalVisible={setIsVisible} title={'Reviews'} />
      <View style={tw`flex-1 ${theme ===  'light' ? 'bg-light' : 'bg-dark'}`}>
        {isLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.user.id}-${item.created_at}`}
            renderItem={renderItem}
            contentContainerStyle={tw`pb-8`}
            ListEmptyComponent={
              <View style={tw`items-center mt-10`}>
                <Text style={tw`text-gray-500`}>No reviews yet.</Text>
              </View>
            }
            ListFooterComponent={
              <View style={tw`h-[30%] bg-transparent`} />
            }
          />
        )}
      </View>
    </Modal>
  )
}

export default BookReviews