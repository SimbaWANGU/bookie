import React, { useState, useMemo } from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import tw from '@utils/tailwind'
import { useQuery } from '@tanstack/react-query'
import { BookEntry, BookLiked, BookReview } from '@models/useractivity.type'
import { getPublishedBooks, getUserLikedBooks, getUserReviewedBooks } from '@api/activity/api.homeactivity'
import UserBookReview from './UserBookReview'
import CreatorBookPublished from './CreatorBookPublished'
import UserBookLiked from './UserBookLiked'
import useCreatorFollows from '@hooks/profile/useCreatorFollows'
import useUserFollows from '@hooks/profile/useUserFollows'
import { QueryKeys } from '@constants/QueryKeys'

const UserActivities = () => {
  const { data: authorFollows } = useCreatorFollows()
	const { data: userFollows } = useUserFollows()
  
  // Unconditionally call all your hooks
  const { data: likedBooks = [], isLoading: likedBooksLoading, error: likedBooksError } = useQuery<BookLiked[]>({
    queryKey: [QueryKeys.likedBooks],
    queryFn: async () => await getUserLikedBooks(userFollows!),
    enabled: userFollows !== null || userFollows || undefined
  })

  console.log(likedBooks)

  const { data: reviewedBooks = [], isLoading: reviewedBooksLoading, error: reviewedBooksError } = useQuery<BookReview[]>({
    queryKey: [QueryKeys.reviewedBooks],
    queryFn: getUserReviewedBooks
  })

  const { data: publishedBooks = [], isLoading: publishedBooksLoading, error: publishedBooksError } = useQuery<BookEntry[]>({
    queryKey: [QueryKeys.publishedBooks],
    queryFn: async () => await getPublishedBooks(authorFollows!),
    enabled: authorFollows !== undefined || authorFollows !== null
  })

  // Combine all activities into one array and shuffle it (using useMemo is safe here)
  const allActivities = useMemo(() => {
    const combined = [
      ...reviewedBooks,
      // ...likedBooks,
      // ...publishedBooks,
    ]
    // Fisher-Yates shuffle
    // for (let i = combined.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [combined[i], combined[j]] = [combined[j], combined[i]];
    // }
    return combined
  }, [likedBooks, reviewedBooks, publishedBooks])

  // Manage the number of items visible in the list
  const [visibleCount, setVisibleCount] = useState(10)

  // Compute the displayed activities (again, useMemo here is only for computation)
  const displayedActivities = useMemo(() => {
    return allActivities.slice(0, visibleCount)
  }, [allActivities, visibleCount])

  // Function to load more items
  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 10, allActivities.length)
    )
  }

  // Handle loading and errors unconditionally at the top level
  if (likedBooksLoading || reviewedBooksLoading || publishedBooksLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (likedBooksError || reviewedBooksError || publishedBooksError) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading activities</Text>
      </View>
    )
  }

  // Render the activity item based on its type
  const renderItem = ({ item }: { item: BookLiked | BookReview | BookEntry }) => {
    if ('review' in item) {
      // Render a book review
      return (
        <UserBookReview item={item} />
      )
    } else if ('creators' in item) {
      // Render a published book entry
      return (
        <CreatorBookPublished item={item} />
      )
    } else {
      // Render a liked book
      return (
        <UserBookLiked item={item} />
      )
    }
  }

  return (
    <View style={tw`flex-1 mt-4`}>
      <FlatList
        data={displayedActivities}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.book_id + '-' + index}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`p-4`}
        ListFooterComponent={() =>
          visibleCount < allActivities.length ? (
            <ActivityIndicator size="small" style={tw`my-4`} />
          ) : null
        }
      />
    </View>
  )
}

export default UserActivities