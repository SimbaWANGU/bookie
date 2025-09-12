import { getFeedItemLikes } from '@api/activity/api.homeactivity'
import ModalHeader from '@components/headers/modalsHeader'
import { QueryKeys } from '@constants/QueryKeys'
import { LikedBookFeedEntry } from '@models/feed.type'
import { likedFeedBook } from '@stores/feed.state'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { ActivityIndicator, FlatList, Image, Modal, Text, View, useColorScheme } from 'react-native'

interface BottomSheetLikes {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const BookLikes: React.FC<BottomSheetLikes> = ({ isVisible, setIsVisible }) => {
  const theme = useColorScheme()
  const [likedBook, setLikedBook] = useAtom(likedFeedBook)

  const { data = [], isLoading } = useQuery({
    queryKey: [QueryKeys.feedBookLikes, likedBook],
    queryFn: async () => await getFeedItemLikes(likedBook),
    enabled: !!likedBook
  })

  useEffect(() => {
    return () => {
      setLikedBook('')
    }
  }, [])

  const renderItem = ({ item }: { item: LikedBookFeedEntry }) => {
    const user = item.user
    return (
      <View style={tw`flex-row items-center gap-3 px-4 py-2`}>
        <Image
          source={{ uri: user.avatar_url }}
          style={tw`w-10 h-10 rounded-full bg-gray-200`}
        />
        <View>
          <Text style={tw`text-base font-medium text-black`}>{user.name}</Text>
          <Text style={tw`text-sm text-gray-500`}>@{user.user_name}</Text>
        </View>
      </View>
    )
  }

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ModalHeader setModalVisible={setIsVisible} title={'Liked By'} />
      <View style={tw`flex-1 ${theme ===  'light' ? 'bg-light' : 'bg-dark'}`}>
        {isLoading ?
          (
            <ActivityIndicator style={tw`mt-10`} size={'large'} />
          ) : (
          <>
            <View style={tw`flex-1`}>

              {isLoading ? (
                <View style={tw`flex-1 justify-center items-center`}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  data={data as LikedBookFeedEntry[]}
                  keyExtractor={(item) => item.user.name}
                  renderItem={renderItem}
                  contentContainerStyle={tw`pb-8`}
                  ListEmptyComponent={
                    <View style={tw`items-center mt-10`}>
                      <Text style={tw`text-gray-500`}>No likes yet.</Text>
                    </View>
                  }
                />
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

export default BookLikes