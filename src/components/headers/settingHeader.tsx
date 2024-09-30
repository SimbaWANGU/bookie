import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { View } from '@components/styled/Themed'
import { light, dark } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, useColorScheme } from 'react-native'
import tw from 'twrnc'

const SettingHeader = () => {
	const theme = useColorScheme()
	return (
		<View
			style={[tw`flex w-full flex-row justify-between items-center px-4 mt-6`, {
        height: getDynamicValue(120)
      }]}
			lightColor={light.background}
			darkColor={dark.background}
		>
			<Pressable
				style={tw`p-2 h-10`}
				onPress={() => router.back()}
			>
				<FontAwesomeSixIcons name={'arrow-left'} style={tw`text-xl`} color={theme === 'light' ? light.text : dark.text} />
			</Pressable>
		</View>
	)
}

export default SettingHeader