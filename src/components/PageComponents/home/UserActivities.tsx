import React, { useState, useMemo } from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import tw from '@utils/tailwind'
import { useQuery } from '@tanstack/react-query'
import { BookByGenre, BookEntry, BookLiked, BookReview } from '@models/useractivity.type'
import { getBooksByGenres, getOthersStartedReading, getPublishedBooks, getUserLikedBooks, getUserReviewedBooks } from '@api/activity/api.homeactivity'
import UserBookReview from './UserBookReview'
import CreatorBookPublished from './CreatorBookPublished'
import UserBookLiked from './UserBookLiked'
import useCreatorFollows from '@hooks/profile/useCreatorFollows'
import useUserFollows from '@hooks/profile/useUserFollows'
import { QueryKeys } from '@constants/QueryKeys'
import { useAtom } from 'jotai'
import { bookPreferencesAtom } from '@stores/preference.state'
import BookByGenreCard from './BookByGenre'
import { activityFilterAtom } from '@stores/filter.state'

const UserActivities = () => {
  const [myPreferredBooks] = useAtom(bookPreferencesAtom)
  const [activityFilter] = useAtom(activityFilterAtom)
  const { data: authorFollows } = useCreatorFollows()
	const { data: userFollows } = useUserFollows()

  // const simplified = userFollows.map(item => ({ id: item.users. }))
  
  // Unconditionally call all your hooks
  const { data: likedBooks = [], isLoading: likedBooksLoading, error: likedBooksError } = useQuery<BookLiked[]>({
    queryKey: [QueryKeys.likedBooks],
    queryFn: async () => await getUserLikedBooks(userFollows!),
    enabled: userFollows !== null || userFollows || undefined
  })

  const { data: reviewedBooks = [], isLoading: reviewedBooksLoading, error: reviewedBooksError } = useQuery<BookReview[]>({
    queryKey: [QueryKeys.reviewedBooks],
    queryFn: async () => await getUserReviewedBooks(userFollows!),
    enabled: userFollows !== null || userFollows || undefined
  })

  const { data: publishedBooks = [], isLoading: publishedBooksLoading, error: publishedBooksError } = useQuery<BookEntry[]>({
    queryKey: [QueryKeys.publishedBooks],
    queryFn: async () => await getPublishedBooks(authorFollows!),
    enabled: authorFollows !== undefined || authorFollows !== null
  })

  const { data: preferredBooks = [], isLoading: preferredBooksLoading, error: preferredBooksError } = useQuery<BookByGenre[]>({
    queryKey: [QueryKeys.preferredBooks],
    queryFn: async () => await getBooksByGenres(myPreferredBooks)
  })

  const { data: othersStartedReading = [], isLoading: othersStartedReadingLoading, error: othersStartedReadingError } = useQuery({
    queryKey: [QueryKeys.otherstartedReading],
    queryFn: async () => await getOthersStartedReading(userFollows!)
  })

  // Combine all activities into one array and shuffle it (using useMemo is safe here)
  const allActivities = useMemo(() => {
    switch (activityFilter) {
      case 'likes':
        return likedBooks
      case 'reviewed':
        return reviewedBooks
      case 'authors':
        return publishedBooks
      case '':
      default: {
        const combined = [
          ...reviewedBooks,
          ...likedBooks,
          ...publishedBooks,
          ...preferredBooks,
          ...othersStartedReading
        ]
        // Fisher-Yates shuffle
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        return combined
      }
    }
  }, [activityFilter, likedBooks, reviewedBooks, publishedBooks, preferredBooks, othersStartedReading])
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
  const renderItem = ({ item }: { item: BookLiked | BookReview | BookEntry | BookByGenre }) => {
    if ('review' in item) {
      // Render a book review
      return (
        <UserBookReview item={item} />
      )
    }  else if ('creators' in item) {
      // Render a published book entry
      return (
        <CreatorBookPublished item={item} />
      )
    } else if ('creator_books' in item) {
      // Render a published book entry
      return (
        <BookByGenreCard item={item} />
      )
    } 
    else {
      // Render a liked book
      return (
        <UserBookLiked item={item} />
      )
    }
  }

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={displayedActivities}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          if ('review' in item) {
            return `review-${item.user_id}-${item.book_id}`
          } else if ('creators' in item) {
            return `published-${item.creator_id}-${item.book_id}`
          } else if ('creator_books' in item) {
            return `genre-${item.id}`
          } else if ('current_paragraph' in item) {
            return `progress-${item.book_id}-${item.user_id}`
          } else if ('book_id' in item && 'user_id' in item) {
            return `liked-${item.book_id}-${item.user_id}`
          } else {
            return `unknown-${index}`
          }
        }}
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