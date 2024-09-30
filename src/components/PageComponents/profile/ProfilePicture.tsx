import { Image, View } from 'react-native'
import useProfilePicture from '@hooks/useProfilePicture'
import tw from 'twrnc'

// Image item component that displays the image from Supabase Storage and a delte button
const ProfilePicture = () => {
	const [image] = useProfilePicture()

	return (
		<View style={tw`p-2`}>
			<Image
				source={{ uri: image === '' ? 'https://ui-avatars.com/api/?name=U+N' : image }}
				style={tw`aspect-square w-52 h-52 rounded-full`}
			/>
		</View>
	)
}

export default ProfilePicture