import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import tw from '@utils/tailwind'
import { getDynamicValue } from '@constants/Functions'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { supabase } from '@utils/supabase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { useLocalSearchParams } from 'expo-router'
import { fetchAuthor } from '@api/profile/api.author'
import { QueryKeys } from '@constants/QueryKeys'
import { CreatorWithFollow } from '@models/follows/author.type'

const ProfilePicture = () => {
  const [user] = useAtom(userAtom)
  const { author } = useLocalSearchParams()
  const queryClient = useQueryClient()

  const [optimisticFollowing, setOptimisticFollowing] = useState<boolean>(false)

  const { data: authorData } = useQuery<CreatorWithFollow>({
    queryKey: ['author_follow', author],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_creator_with_follow', { _creator_id: author,  _user_id: user?.id }).single()

      if (error) throw error
      return data as CreatorWithFollow
    },
    enabled: !!author && !!user?.id,
  })

  const { data } = useQuery({
    queryKey: ['author', author],
    queryFn: () => fetchAuthor(author as string),
    enabled: !!author,
  })

  // Set initial optimistic value from remote data
  useEffect(() => {
    if (authorData?.is_following !== undefined) {
      setOptimisticFollowing(authorData.is_following)
    }
  }, [authorData?.is_following])

  const followUserMutation = useMutation({
    mutationFn: async () => await supabase.from('users_follow_creators').insert([{ creator_id: author as string, user_id: user?.id }]),
    onMutate: async () => setOptimisticFollowing(true),
    onError: () => setOptimisticFollowing(false),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['author_follow', author] })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.authorsUserFollows, user?.id] })
    },
  })

  const unfollowUserMutation = useMutation({
    mutationFn: async () => await supabase.from('users_follow_creators').delete().match({ creator_id: author as string, user_id: user?.id }),
    onMutate: async () => setOptimisticFollowing(false),
    onError: () => setOptimisticFollowing(true),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['author_with_follow', author] })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.authorsUserFollows, user?.id] })
    },
  })

  return (
    <TouchableOpacity activeOpacity={0.8} style={tw`relative`}>
      <Image
        source={{ uri: data?.avatar_url }}
        style={[
          tw`aspect-square rounded-full border-2 border-white bg-gray-200`,
          { width: getDynamicValue(200) },
        ]}
        transition={500}
      />

      {optimisticFollowing ? (
        <TouchableOpacity
          style={tw`absolute aspect-square ios:h-10 android:h-12 bottom-0 right-0 bg-accent items-center justify-center rounded-full p-1`}
          activeOpacity={0.8}
          onPress={() => unfollowUserMutation.mutate() }
        >
          <SimpleLineIcons name="user-following" style={tw`text-xl text-white`} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`absolute aspect-square ios:h-10 android:h-12 bottom-0 right-0 bg-white items-center justify-center rounded-full p-1`}
          activeOpacity={0.8}
          onPress={() => followUserMutation.mutate() }
        >
          <SimpleLineIcons name="user-follow" style={tw`text-xl text-accent`} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export default ProfilePicture