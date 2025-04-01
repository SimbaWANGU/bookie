import { TouchableOpacity, View, useColorScheme } from 'react-native'
import { Image } from 'expo-image'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { convertToTime, getDynamicValue } from '@constants/Functions'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

// Image item component that displays the image from Supabase Storage and a delte button
interface ProfilePictureProps {
	setModalProfileUpdateModal: (bool: boolean) => void
	setModaTime: (bool: boolean) => void
	setModalAchievement: (bool: boolean) => void
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ setModalProfileUpdateModal, setModaTime, setModalAchievement }) => {
	const theme = useColorScheme()
	const [user] = useAtom(userAtom)

	return (
		<View style={tw`self-start flex flex-row shadow -top-14 px-2 z-20 w-full bg-transparent`}>
			<TouchableOpacity onPress={() => setModalProfileUpdateModal(true)}>
				<Image
					source={{ uri: user?.avatar_url }}
					style={[tw`aspect-square rounded-full border-2 border-white bg-gray-200`, {
						width: getDynamicValue(200)
					}]}
					transition={1000}
				/>
			</TouchableOpacity>
			<View style={tw`self-end items-end w-auto ml-auto flex flex-col top-2 gap-1`}>
				<TouchableOpacity
					style={tw`p-2 rounded-full ${theme === 'light' ? 'bg-accent/20' : 'bg-accent'}`}
					activeOpacity={.8}
					// should open modal for viewing stats
					onPress={() => setModaTime(true)}
				>
					<QuickSandText style={tw`text-sm ${theme === 'light' ? 'text-accentdark' : 'text-light/80'} mx-2`}>{convertToTime(20)}</QuickSandText>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw`p-2 rounded-full ${theme === 'light' ? 'bg-accent/20' : 'bg-accent'}`}
					activeOpacity={.8}
					// should open modal for viewing stats
					onPress={() => setModalAchievement(true)}
				>
					
					<QuickSandText 
						style={tw`text-sm ${theme === 'light' ? 'text-accentdark' : 'text-light/80'} mx-2`}
						// show latest achievement
					>Starting Out!</QuickSandText>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ProfilePicture