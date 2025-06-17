import { TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDynamicValue } from '@constants/Functions'
import tw from '@utils/tailwind'
import { Ionicons } from '@expo/vector-icons'
import { LikeBook, checkLikeExists, likeBook, unlikeBook } from '@api/books/api.like'
import { useMutation, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@constants/QueryKeys'

interface LikeProps {
  user_id: string
  book_id: string
}

const Like: React.FC<LikeProps> = ({ user_id, book_id  }) => {
  const [liked, setLiked] = useState(false)
  
  const { data: likeData } = useQuery({
    queryKey: [QueryKeys.checkLike, user_id, book_id],
    queryFn: () => checkLikeExists({ user_id, book_id })
  })

  useEffect(() => {
    setLiked(!!likeData)
  }, [likeData])

  const likeBookMutation = useMutation({
    mutationFn: (payload: LikeBook) => likeBook(payload),
    mutationKey: ['like-book'],
    onError: () => setLiked(!liked)
  })

  const unlikeBookMutation = useMutation({
    mutationFn: (payload: LikeBook) => unlikeBook(payload),
    mutationKey: ['unlike-book'],
    onError: () => setLiked(!liked)
  })

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      unlikeBookMutation.mutate({ user_id, book_id })
    } else {
      setLiked(true)
      likeBookMutation.mutate({ user_id, book_id })
    }
  }
  
  return (
    <TouchableOpacity onPress={handleLike} style={tw`p-2`}>
      {liked ?
        (
          <Ionicons
            name={'heart'}
            size={getDynamicValue(50)}
            color={'red'}
          />
        ) : (
          <Ionicons
            name={'heart-outline'}
            size={getDynamicValue(50)}
            color={'gray'}
          />
        )
      }
    </TouchableOpacity>
  )
}

export default Like