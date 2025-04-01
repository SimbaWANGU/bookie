import React from 'react'
import { View } from '@components/styled/Themed'
import { getDynamicValue } from '@constants/Functions'
import { Pressable, useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import { router } from 'expo-router'
import Logo from '@assets/images/bookworms-logo.png'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import tw from 'twrnc'
import { ImageBackground, Image } from 'expo-image'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

const ProfileHeader = () => {
	const theme = useColorScheme()
	const [user] = useAtom(userAtom)
	
	return (
		<ImageBackground
			style={[tw`flex w-full flex-row px-4 bg-accent`, {
				height: getDynamicValue(300)
			}]}
			source={{ uri: 'https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2Fabstract_art_Compressed_638250928944386407.jpg&w=1920&q=75'}}
			// placeholder={async () => await Image.generateBlurhashAsync('https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2Fabstract_art_Compressed_638250928944386407.jpg&w=1920&q=75', [4, 3]) }
		>	
		</ImageBackground>
	)
}

export default ProfileHeader