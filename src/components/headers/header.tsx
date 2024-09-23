import React from 'react'
import { View } from '@components/styled/Themed'
import { getDynamicValue } from '@constants/Functions'
import { Image, Pressable } from 'react-native'
import { light, dark } from '@constants/Color'
import { MonoText } from '@components/styled/StyledText'
import { router } from 'expo-router'

interface HeaderProps {
  username: string
  avatarUrl: string
}

const Header:React.FC<HeaderProps> = ({ username, avatarUrl }) => {
	return (
		<View
			className={`flex w-full flex-row justify-between items-center px-4 mt-6`}
			style={{ height: getDynamicValue(120) }}
			
			lightColor={light.background}
			darkColor={dark.background}
		>
			<MonoText
				className='text-xl'
				lightColor={light.text}
				darkColor={dark.text}
			>{`@${username}`}</MonoText>
			<Pressable
				onPress={() => router.push('/profile')}
			>
				<Image
					source={{ uri : avatarUrl }}
					className='aspect-square p-4 rounded-full h-6/12'
				/>
			</Pressable>
		</View>
	)
}

export default Header