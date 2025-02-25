import { Image, View } from 'react-native'
import tw from 'twrnc'

// Image item component that displays the image from Supabase Storage and a delte button
const ProfilePicture = () => {
	return (
		<View style={tw`p-2`}>
			<Image
				source={{ uri: 'https://ui-avatars.com/api/?name=U+N' }}
				style={tw`aspect-square w-52 h-52 rounded-full`}
			/>
		</View>
	)
}

export default ProfilePicture