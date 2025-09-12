import { View, useColorScheme, Text, TouchableOpacity, Pressable, Platform } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { GroupedFeedItem } from '@models/feed.type'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { QuickSandTextBold, QuickSandTextMedium, QuickSandTextRegular } from '@components/styled/StyledText'
import { useSetAtom } from 'jotai'
import { likedFeedBook, reviewedFeedBook } from '@stores/feed.state'
import LikeReviewStats from './LikeReviewStats'
import { router } from 'expo-router'

interface FeedItemProps {
  item: GroupedFeedItem
  setLikedBookFeedVisible: Dispatch<SetStateAction<boolean>>
  setReviewedBookFeedVisible: Dispatch<SetStateAction<boolean>>
}

const FeedItem: React.FC<FeedItemProps> = ({
  item,
  setLikedBookFeedVisible,
  setReviewedBookFeedVisible
}) => {
  const theme = useColorScheme()
  const setLikedBook = useSetAtom(likedFeedBook)
  const setReviewedBook = useSetAtom(reviewedFeedBook)

  const { id, title, cover_image_url, description, creator_books } = item.book
  const creator = creator_books?.[0]?.creators

  // Derive unique actors from all activities
  const actors = [
    ...new Map(
      item.activities
        .flatMap(activity => activity.actors || [])
        .map(actor => [actor.id, actor])
    ).values()
  ]

  return (
    <Pressable
      onPress={() => router.push(`/book/${id}`)}
      android_ripple={{ color: '#198d9e11'}}
      style={({ pressed }) => [
        tw`mb-4 p-4 rounded-2xl border-b border-gray-700/20 ${
          theme === 'light' ? 'bg-light/90' : 'bg-dark/90'
        }`,
        pressed && Platform.OS === 'ios' && tw`opacity-70` // iOS press feedback
      ]}
    >
      {/* Book Info Row */}
      <View style={tw`flex-row`}>
        {/* Book Cover */}
        {cover_image_url ? (
          <Image
            source={{ uri: cover_image_url }}
            style={tw`w-20 h-28 rounded-lg mr-4`}
            contentFit="cover"
          />
        ) : (
          <View style={tw`w-20 h-28 rounded-lg mr-4 bg-gray-200`} />
        )}

        {/* Text Info */}
        <View style={tw`flex-1`}>
          <QuickSandTextBold
            style={tw`text-lg ${
              theme === 'light' ? 'text-dark' : 'text-light'
            }`}
          >
            {title}
          </QuickSandTextBold>

          {creator && (
            <QuickSandTextMedium
              style={tw`text-sm mb-1 ${
                theme === 'light' ? 'text-accent' : 'text-accent'
              }`}
            >
              @{creator.alias}
            </QuickSandTextMedium>
          )}

          {description && (
            <QuickSandTextRegular
              numberOfLines={3}
              style={tw`text-sm mb-3 ${
                theme === 'light' ? 'text-dark/70' : 'text-light/80'
              }`}
            >
              {description}
            </QuickSandTextRegular>
          )}
        </View>
      </View>

      {/* Bottom Row */}
      <View style={tw`flex-row justify-between items-end mt-3`}>
        {/* Actor Avatars */}
        <View style={tw`flex-row items-center`}>
          {actors.slice(0, 5).map((user, index) => (
            <Image
              key={user.id}
              source={{ uri: user.avatar_url }}
              style={tw.style(
                'w-7 h-7 rounded-full border-2 border-white',
                index !== 0 && '-ml-2'
              )}
            />
          ))}
          {actors.length > 5 && (
            <View
              style={tw`w-7 h-7 rounded-full bg-gray-300 justify-center items-center -ml-2 border-2 border-white`}
            >
              <Text style={tw`text-xs text-gray-700 font-semibold`}>
                +{actors.length - 5}
              </Text>
            </View>
          )}
        </View>

        {/* Like & Review Stats */}
        <LikeReviewStats id={id} setLikedBook={setLikedBook} setLikedBookFeedVisible={setLikedBookFeedVisible} setReviewedBook={setReviewedBook} setReviewedBookFeedVisible={setReviewedBookFeedVisible} />
        
      </View>
    </Pressable>
  )
}

export default FeedItem