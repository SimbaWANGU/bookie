import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import { View } from 'react-native'
import tw from '@utils/tailwind'
import { useInfiniteQuery } from '@tanstack/react-query'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import { QueryKeys } from '@constants/QueryKeys'
import { LegendList, LegendListRef } from '@legendapp/list'
import FeedItem from './FeedItem'
import { getUserFeed } from '@api/activity/api.homeactivity'
import { groupFeedItemsByBook } from '@constants/Functions'

const PAGE_SIZE = 15

interface UserActivitiesProps {
  setLikedBookFeedVisible: Dispatch<SetStateAction<boolean>>
  setReviewedBookFeedVisible: Dispatch<SetStateAction<boolean>>
}

const UserActivities: React.FC<UserActivitiesProps> = ({ setLikedBookFeedVisible, setReviewedBookFeedVisible }) => {
  const listRef = useRef<LegendListRef | null>(null)
  const [user] = useAtom(userAtom)

  const { data, fetchNextPage,  hasNextPage,  isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.feed],
    queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => await getUserFeed(user?.id as string, pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined // No more pages
      return allPages.length * PAGE_SIZE // Next offset
    },
    enabled: !!user?.id,
    initialPageParam: 0
  })

  // Flatten and group feed
  const groupedFeed = useMemo(() => {
    const flattened = data?.pages.flat() ?? []
    return groupFeedItemsByBook(flattened)
  }, [data])

  return (
    <View style={tw`flex-1 bg-transparent`}>
      <LegendList
        ref={listRef}
        data={groupedFeed}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.book.id}`}
        renderItem={({ item }) => <FeedItem item={item} setLikedBookFeedVisible={setLikedBookFeedVisible} setReviewedBookFeedVisible={setReviewedBookFeedVisible} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
      />
    </View>
  )
}

export default UserActivities