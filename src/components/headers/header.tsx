import React from 'react'
import { View } from '@components/styled/Themed'
import { getDynamicValue } from '@constants/Functions'
import { Pressable, useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import tw from '@utils/tailwind'
import logo from '@images/bookworms-logo.png' 
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

const Header = () => {
	const [user] = useAtom(userAtom)
	const theme = useColorScheme()
	return (
		<View
			style={[tw`
				flex w-full flex-row justify-between items-end pb-2 px-4
				${theme === 'light' ? 'bg-light' : 'bg-dark'}`, {
				height: getDynamicValue(140)
			}]}
		>
			<Pressable
				onPress={() => router.push('/')}
			>
				<Image
					source={logo}
					style={tw`aspect-square rounded-full h-5/12`}
					contentFit='contain'
				/>
			</Pressable>
		</View>
	)
}

export default Header