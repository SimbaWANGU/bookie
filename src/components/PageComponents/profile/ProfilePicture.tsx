import React from 'react'
import { TouchableOpacity } from 'react-native'
import tw from '@utils/tailwind'
import { getDynamicValue } from '@constants/Functions'
import { Image } from 'expo-image'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

interface FollowableProfilePictureProps {
  id?: string;
  setModalProfileUpdateModal: (visible: boolean) => void;
}

const ProfilePicture: React.FC<FollowableProfilePictureProps> = ({ id, setModalProfileUpdateModal }) => {
  const [user] = useAtom(userAtom)

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
        
      />
    </TouchableOpacity>
  )
}

export default ProfilePicture