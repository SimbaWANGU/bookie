import React, { useRef } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { ReadingProgress } from '@models/useractivity.type'
import { getOthersStartedReading } from '@api/activity/api.homeactivity'
import useUserFollows from '@hooks/profile/useUserFollows'
import { QueryKeys } from '@constants/QueryKeys'
import UserStartedReading from './ReadingProgress'
import tw from '@utils/tailwind'
import { LegendList, LegendListRef } from '@legendapp/list'

const OthersStartedReadingStories = () => {
  const { data: userFollows } = useUserFollows()
  const listRef = useRef<LegendListRef | null>(null)

  const { data: othersStartedReading = [], isLoading, error } = useQuery<ReadingProgress[]>({
    queryKey: [QueryKeys.otherstartedReading],
    queryFn: async () => await getOthersStartedReading(userFollows!),
    enabled: !!userFollows
  })

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading stories</Text>
      </View>
    )
  }

  if (othersStartedReading.length === 0) {
    return null
  }

  // ⚠️ Duplicate data for preview/testing only
  const duplicatedData = othersStartedReading.flatMap((item) =>
    Array.from({ length: 5 }, (_, i) => ({
      ...item,
      user_id: `${item.user_id}_dup${i}`,
      book_id: `${item.book_id}_dup${i}`,
    }))
  )

  return (
    <LegendList
      ref={listRef}
      horizontal
      data={duplicatedData}
      keyExtractor={(item) => `${item.user_id}-${item.book_id}`}
      renderItem={({ item }) => <UserStartedReading item={item} />}
      contentContainerStyle={tw`px-4 py-2 gap-4`}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default OthersStartedReadingStories