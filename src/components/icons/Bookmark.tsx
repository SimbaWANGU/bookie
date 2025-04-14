import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useQuery, useMutation } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { getDynamicValue } from '@constants/Functions'
import { BookmarkBook, bookmarkBook, checkBookmarkExists, unbookmarkBook } from '@api/books/api.bookmark'

interface BookmarkProps {
  user_id: string
  book_id: string
}

const Bookmark: React.FC<BookmarkProps> = ({ user_id, book_id }) => {
  // Check for an existing bookmark.
  const { data: bookmarkData } = useQuery({
    queryKey: ['checkBookmark', user_id, book_id],
    queryFn: () => checkBookmarkExists({ user_id, book_id }),
  })

  const [bookmarked, setBookmarked] = useState(false)

  // Update bookmarked state based on query result.
  useEffect(() => {
    setBookmarked(!!bookmarkData)
  }, [bookmarkData])

  // Mutation for adding a bookmark.
  const bookmarkMutation = useMutation({
    mutationFn: (payload: BookmarkBook) => bookmarkBook(payload),
    mutationKey: ['bookmark-book'],
    onSuccess: (data) => {
      console.log('Book bookmarked successfully', data)
    },
    onError: (error: any) => {
      console.error('Error bookmarking book:', error.message)
    },
  })

  // Mutation for removing a bookmark.
  const unbookmarkMutation = useMutation({
    mutationFn: (payload: BookmarkBook) => unbookmarkBook(payload),
    mutationKey: ['unbookmark-book'],
    onSuccess: (data) => {
      console.log('Book unbookmarked successfully', data)
    },
    onError: (error: any) => {
      console.error('Error unbookmarking book:', error.message)
    },
  })

  // Toggle bookmark state and call the appropriate mutation.
  const handleBookmark = () => {
    if (bookmarked) {
      setBookmarked(false)
      unbookmarkMutation.mutate({ user_id, book_id })
    } else {
      setBookmarked(true)
      bookmarkMutation.mutate({ user_id, book_id })
    }
  }

  return (
    <TouchableOpacity onPress={handleBookmark} style={tw`p-2`}>
      {bookmarked ? (
        <Ionicons
          name="bookmark"
          size={getDynamicValue(50)}
          color="#FFA500"
        />
      ) : (
        <Ionicons
          name="bookmark-outline"
          size={getDynamicValue(50)}
          color="gray"
        />
      )}
    </TouchableOpacity>
  )
}

export default Bookmark