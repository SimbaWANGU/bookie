import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import tw from '@utils/tailwind'
import { getDynamicValue } from '@constants/Functions'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { fetchOtherUser } from '@api/profile/api.user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import useOtherUserIsFollowed from '@hooks/otherUserProfile/useOtherUserIsFollowed'
import { supabase } from '@utils/supabase'
import { QueryKeys } from '@constants/QueryKeys'

interface FollowableProfilePictureProps {
  id?: string;
}

const ProfilePicture: React.FC<FollowableProfilePictureProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const queryClient = useQueryClient()

  // Fetch whether current user is following the other user
  const { data: userFollowerCount } = useOtherUserIsFollowed({ id: id as string })

  const { data: otherUser } = useQuery({
    queryKey: [QueryKeys.otherUser, id],
    queryFn: async () => await fetchOtherUser(id as string),
    enabled: !!id,
  })

  // Determine following status (from remote data)
  const isFollowing = userFollowerCount?.some(item => item.follower === user?.id)

  // Local state for optimistic update.
  // Initialize with the value from your query.
  const [optimisticFollowing, setOptimisticFollowing] = useState(isFollowing)

  // Synchronize the optimistic state with the query value when it changes.
  useEffect(() => {
    setOptimisticFollowing(isFollowing)
  }, [isFollowing])

  const followUserMutation = useMutation({
    mutationKey: ['follow_user', id],
    mutationFn: async () => await supabase.from('user_follows_user').insert([{ followee: id, follower: user?.id }]),
    onError: () => setOptimisticFollowing(false),
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeys.usersFollowingOtherUser, id as string, QueryKeys.usersFollowed, user?.id as string] })
      await supabase.functions.invoke('push-follow-user', { body: { user: { id: user?.id, user_name: user?.name }, followed: { expo_push_token: otherUser?.expo_push_token } } })
    }
  })

  const unfollowUserMutation = useMutation({
    mutationKey: ['unfollow_user', id],
    mutationFn: async () => await supabase.from('user_follows_user').delete().match({ followee: id, follower: user?.id }),
    onError: () => setOptimisticFollowing(true),
    onSettled: () => queryClient.refetchQueries({ queryKey: [QueryKeys.usersFollowingOtherUser, id as string, QueryKeys.usersFollowed, user?.id as string] })
  })

  return (
    <View style={tw`relative`} >
      <Image
        source={{ uri: otherUser?.avatar_url }}
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
          onPress={() => {
            // Optimistically update state
            setOptimisticFollowing(false)
            unfollowUserMutation.mutate()
          }}
        >
          <SimpleLineIcons name="user-following" style={tw`text-xl text-white`} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`absolute aspect-square ios:h-10 android:h-12 bottom-0 right-0 bg-white items-center justify-center rounded-full p-1`}
          activeOpacity={0.8}
          onPress={() => {
            // Optimistically update state
            setOptimisticFollowing(true)
            followUserMutation.mutate()
          }}
        >
          <SimpleLineIcons name="user-follow" style={tw`text-xl text-accent`} color="black" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ProfilePicture