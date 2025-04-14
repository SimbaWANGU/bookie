import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '@utils/tailwind';
import { getDynamicValue } from '@constants/Functions';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { fetchOtherUser } from '@api/profile/api.user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from '@stores/user.state';
import useUserFollows from '@hooks/profile/useUserFollows';
import { supabase } from '@utils/supabase';

interface FollowableProfilePictureProps {
  id?: string;
  setModalProfileUpdateModal: (visible: boolean) => void;
}

const ProfilePicture: React.FC<FollowableProfilePictureProps> = ({ id, setModalProfileUpdateModal }) => {
  const [user] = useAtom(userAtom)
  const queryClient = useQueryClient()
  const { data: userFollowerCount } = useUserFollows()

  const follows = userFollowerCount?.some(item => item.followee === id)
  
  const [isFollowing] = useState(follows)
  
  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={ id === user?.id ? () => null : () => setModalProfileUpdateModal(true) }
      // Make sure the container is "relative" so the absolute icon is positioned correctly
      style={tw`relative`}
    >
      <Image
        source={{ uri: user?.avatar_url }}
        style={[
          tw`aspect-square rounded-full border-2 border-white bg-gray-200`,
          { width: getDynamicValue(200) },
        ]}
        transition={500}
      />
    </TouchableOpacity>
  );
};

export default ProfilePicture;