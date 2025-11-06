import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { QuickSandTextLight } from '@components/styled/StyledText'
import { hitSlop } from '@constants/HitSlop'
import tw from '@utils/tailwind'
import { getFeedItemStats } from '@api/activity/api.homeactivity'
import { QueryKeys } from '@constants/QueryKeys'
import { BookStatsItem } from '@models/feed.type'
import { useQuery } from '@tanstack/react-query'
import { FontAwesome6 } from '@expo/vector-icons'

interface LikeReviewStatsProps {
  id: string
  setLikedBook: Dispatch<SetStateAction<string>>
  setLikedBookFeedVisible: Dispatch<SetStateAction<boolean>>
  setReviewedBook: Dispatch<SetStateAction<string>>
  setReviewedBookFeedVisible: Dispatch<SetStateAction<boolean>>
}

const LikeReviewStats: React.FC<LikeReviewStatsProps> = ({ id, setLikedBook, setLikedBookFeedVisible, setReviewedBook, setReviewedBookFeedVisible }) => {
  const theme = useColorScheme()

  // Fetch stats for the book (likes, reviews)
  const { data: bookStats = [], isLoading } = useQuery<BookStatsItem[]>({
    queryKey: [QueryKeys.feedBookStats, id],
    queryFn: async () => await getFeedItemStats(id)
  })
  
  return (
    <View style={tw`flex-row gap-8`}>
      <TouchableOpacity
        onPress={() => {
          setLikedBook(id)
          setLikedBookFeedVisible(true)
        }}
        style={tw`flex-row items-center gap-1`}
        hitSlop={hitSlop}
      >
        <QuickSandTextLight
          style={tw`${theme === 'light' ? 'text-dark' : 'text-light'}`}
        >
          {isLoading
            ? '...'
            : bookStats[0]?.like_count?.[0]?.count ?? 0}
        </QuickSandTextLight>
        <FontAwesome6
          name="heart"
          style={tw`text-sm ${
            theme === 'light' ? 'text-dark/60' : 'text-light/60'
          }`}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setReviewedBook(id)
          setReviewedBookFeedVisible(true)
        }}
        style={tw`flex-row items-center gap-1`}
        hitSlop={hitSlop}
      >
        <QuickSandTextLight
          style={tw`${theme === 'light' ? 'text-dark' : 'text-light'}`}
        >
          {isLoading
            ? '...'
            : bookStats[0]?.review_count?.[0]?.count ?? 0}
        </QuickSandTextLight>
        <FontAwesome6
          name="comment"
          style={tw`text-sm ${
            theme === 'light' ? 'text-dark/60' : 'text-light/60'
          }`}
        />
      </TouchableOpacity>
    </View>
  )
}

export default LikeReviewStats