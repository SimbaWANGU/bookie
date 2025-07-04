import { QuickSandTextRegular } from '@components/styled/StyledText'
import { hitSlop } from '@constants/HitSlop'
import { Feather } from '@expo/vector-icons'
import { userAtom } from '@stores/user.state'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React from 'react'
import { TouchableOpacity, View, useColorScheme } from 'react-native'
import ProfilePicture from './ProfilePicture'

interface ProfilePictureProps {
  setModalProfileUpdateModal: (visible: boolean) => void;
  setModaTime: (visible: boolean) => void;
  setModalAchievement: (visible: boolean) => void;
}

// setModaTime,
const LeadProfileSection: React.FC<ProfilePictureProps> = ({ setModalProfileUpdateModal, setModalAchievement }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)

  return (
    <View style={tw`self-start flex flex-row shadow mt-2 p-2 w-full bg-transparent`}>
      <ProfilePicture setModalProfileUpdateModal={() => setModalProfileUpdateModal(true)}  />

      <View style={tw`flex-1 ml-4 justify-end`}>
        {/* New component displaying the three counts */}
        <View style={tw`flex-row justify-around mb-2 my-auto`}>
          <View style={tw`items-center`}>
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {user?.authors_followed_count}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Authors
            </QuickSandTextRegular>
          </View>
          <View style={tw`items-center`}>
						
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {user?.follower_count}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Followers
            </QuickSandTextRegular>
          </View>
          <View style={tw`items-center`}>
            <QuickSandTextRegular style={tw`text-lg font-bold`}>
              {user?.following_count}
            </QuickSandTextRegular>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Following
            </QuickSandTextRegular>
          </View>
        </View>

        <View style={tw`items-end w-auto ml-auto`}>
          <TouchableOpacity
            style={tw`flex-row items-center p-3 rounded-full ${theme === 'light' ? 'bg-accent/10' : 'bg-accent/30'}`}
            activeOpacity={0.8}
            hitSlop={hitSlop}
            onPress={() => setModalAchievement(true)}
          >
            <Feather
              name="award"
              size={16}
              style={tw`${theme === 'light' ? 'text-accentdark' : 'text-light/80'}`}
            />
            <QuickSandTextRegular
              style={tw`text-sm ml-1 ${theme === 'light' ? 'text-accentdark' : 'text-light/80'}`}
            >
              Achievements
            </QuickSandTextRegular>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LeadProfileSection