import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import tw from '@utils/tailwind';
import { getDynamicValue } from '@constants/Functions';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { fetchOtherUser } from '@api/profile/api.user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from '@stores/user.state';
import useOtherUserIsFollowed from '@hooks/otherUserProfile/useOtherUserIsFollowed';
import { supabase } from '@utils/supabase';

interface FollowableProfilePictureProps {
  id?: string;
  setModalProfileUpdateModal: (visible: boolean) => void;
}

const ProfilePicture: React.FC<FollowableProfilePictureProps> = ({ id, setModalProfileUpdateModal }) => {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();

  // Fetch whether current user is following the other user
  const { data: userFollowerCount } = useOtherUserIsFollowed({ id: id as string });

  const { data: otherUser } = useQuery({
    queryKey: ['other_user', id],
    queryFn: async () => await fetchOtherUser(id as string),
    enabled: !!id,
  });

  // Determine following status (from remote data)
  const isFollowing = userFollowerCount?.some(item => item.follower === user?.id);

  // Local state for optimistic update.
  // Initialize with the value from your query.
  const [optimisticFollowing, setOptimisticFollowing] = useState(isFollowing);

  // Synchronize the optimistic state with the query value when it changes.
  useEffect(() => {
    setOptimisticFollowing(isFollowing);
  }, [isFollowing]);

  const followUserMutation = useMutation({
    mutationKey: ['follow_user', id],
    mutationFn: async () => await supabase.from('user_follows_user').insert([{ followee: id, follower: user?.id }]),
    // onSuccess: async () => {
    //   await new Promise(resolve => setTimeout(resolve, 50));
    //   console.log('query should be invalidated and refetched')
    //   await queryClient.refetchQueries({ queryKey: ['User is Followed', id as string, 'Users Followed', user?.id as string] })
    // },
    onError: () => setOptimisticFollowing(false),
    onSettled: () => queryClient.refetchQueries({ queryKey: ['User is Followed', id as string, 'Users Followed', user?.id as string] })
  });

  const unfollowUserMutation = useMutation({
    mutationKey: ['unfollow_user', id],
    mutationFn: async () => {
      return await supabase
        .from('user_follows_user')
        .delete()
        .match({ followee: id, follower: user?.id });
    },
    // onSuccess: async () => {
    //   await new Promise(resolve => setTimeout(resolve, 50));
    //   console.log('query should be invalidated and refetched')
    //   await queryClient.refetchQueries({ queryKey: ['User is Followed', id as string, 'Users Followed', user?.id as string] });
    // },
    onError: () => {
      // On error, revert the optimistic update.
      setOptimisticFollowing(true);
    },
    onSettled: () => queryClient.refetchQueries({ queryKey: ['User is Followed', id as string, 'Users Followed', user?.id as string] })
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={id === user?.id ? () => null : () => setModalProfileUpdateModal(true)}
      style={tw`relative`}
    >
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
            setOptimisticFollowing(false);
            unfollowUserMutation.mutate();
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
            setOptimisticFollowing(true);
            followUserMutation.mutate();
          }}
        >
          <SimpleLineIcons name="user-follow" style={tw`text-xl text-accent`} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ProfilePicture;