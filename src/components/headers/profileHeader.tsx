import React from 'react'
import { View } from '@components/styled/Themed'
import { getDynamicValue } from '@constants/Functions'
import { Image, Pressable, useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import { router } from 'expo-router'
import Logo from '@assets/images/bookworms-logo.png'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import tw from 'twrnc'

const ProfileHeader = () => {
	const theme = useColorScheme()
	return (
		<View
			style={[tw`flex w-full flex-row justify-between items-center px-4 mt-6`, {
				height: getDynamicValue(80)
			}]}
			lightColor={light.background}
			darkColor={dark.background}
		>
			<Pressable
				onPress={() => router.push('/')}
			>
				<Image
					source={Logo}
					style={tw`aspect-square h-2 p-4 rounded-full`}
				/>
			</Pressable>
			<Pressable
				onPress={() => router.push('/settings')}
			>
				<FontAwesomeSixIcons
					name='gear'
					color={theme === 'light' ? light.iconsColor : dark.iconsColor}
				/>
			</Pressable>
		</View>
	)
}

export default ProfileHeader