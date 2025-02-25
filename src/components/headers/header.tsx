import React from 'react'
import { View } from '@components/styled/Themed'
import { getDynamicValue } from '@constants/Functions'
import { Pressable } from 'react-native'
import { light, dark } from '@constants/Color'
import { MonoText } from '@components/styled/StyledText'
import { router } from 'expo-router'
import tw from 'twrnc'
import icon from '@images/bookworms-logo.png'
import { Image } from 'expo-image'

interface HeaderProps {
  username: string
  avatarUrl: string
}

const Header:React.FC<HeaderProps> = ({ username = 'lol' }) => {
	return (
		<View
			style={[tw`flex w-full flex-row justify-between items-end pb-2 px-4`, {
				height: getDynamicValue(140)
			}]}
			
			lightColor={light.background}
			darkColor={dark.background}
		>
			<MonoText
				style={tw`text-xl`}
				lightColor={light.text}
				darkColor={dark.text}
			>{`@${username}`}</MonoText>
			<Pressable
				onPress={() => router.push('/profile')}
			>
				<Image
					source={
						// avatarUrl ? { uri : avatarUrl } : 
						icon
					}
					style={tw`aspect-square rounded-full h-5/12`}
					contentFit='contain'
				/>
			</Pressable>
		</View>
	)
}

export default Header