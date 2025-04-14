import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { QuickSandText } from '@components/styled/StyledText';
import tw from '@utils/tailwind';
import useCreatorFollows from '@hooks/profile/useCreatorFollows';
import useUserFollows from '@hooks/profile/useUserFollows';
import ProfilePicture from './ProfilePicture';
import useUserIsFollowed from '@hooks/profile/useUserIsFollowed';

interface ProfilePictureProps {
  setModalProfileUpdateModal: (visible: boolean) => void;
  setModaTime: (visible: boolean) => void;
  setModalAchievement: (visible: boolean) => void;
}

// setModaTime,
const LeadProfileSection: React.FC<ProfilePictureProps> = ({ setModalProfileUpdateModal, setModalAchievement }) => {
  const theme = useColorScheme()
	const { data: authorFollows } = useCreatorFollows()
	const { data: userFollowerCount } = useUserFollows()
  const { data: userFollowsCount } = useUserIsFollowed()

  return (
    <View style={tw`self-start flex flex-row shadow p-2 w-full bg-transparent`}>
      <ProfilePicture setModalProfileUpdateModal={() => setModalProfileUpdateModal(true)}  />

      <View style={tw`flex-1 ml-4 justify-end`}>
        {/* New component displaying the three counts */}
        <View style={tw`flex-row justify-around mb-2 my-auto`}>
          <View style={tw`items-center`}>
            <QuickSandText style={tw`text-lg font-bold`}>
              {authorFollows ? authorFollows.length : 0}
            </QuickSandText>
            <QuickSandText style={tw`text-xs text-gray-500`}>
              Authors
            </QuickSandText>
          </View>
          <View style={tw`items-center`}>
						
            <QuickSandText style={tw`text-lg font-bold`}>
              {userFollowsCount ? userFollowsCount.length : 0}
            </QuickSandText>
            <QuickSandText style={tw`text-xs text-gray-500`}>
              Followers
            </QuickSandText>
          </View>
          <View style={tw`items-center`}>
            <QuickSandText style={tw`text-lg font-bold`}>
              {userFollowerCount ? userFollowerCount.length : 0}
            </QuickSandText>
            <QuickSandText style={tw`text-xs text-gray-500`}>
              Following
            </QuickSandText>
          </View>
        </View>

        <View style={tw`items-end w-auto ml-auto`}>
          <TouchableOpacity
            style={tw`p-2 rounded-full ${theme === 'light' ? 'bg-accent/20' : 'bg-accent'}`}
            activeOpacity={0.8}
            // Should open modal for viewing stats
            onPress={() => setModalAchievement(true)}
          >
            <QuickSandText
              style={tw`text-sm ${theme === 'light' ? 'text-accentdark' : 'text-light/80'} mx-2`}
            >
              Starting Out!
            </QuickSandText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LeadProfileSection;