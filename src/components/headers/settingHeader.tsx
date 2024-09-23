import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { View } from '@components/styled/Themed'
import { light, dark } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, useColorScheme } from 'react-native'

const SettingHeader = () => {
	const theme = useColorScheme()
	return (
		<View
			className='flex w-full flex-row justify-between items-center px-4 mt-6'
      style={{
        height: getDynamicValue(120)
      }}
			lightColor={light.background}
			darkColor={dark.background}
		>
			<Pressable
				className='p-2 h-10'
				onPress={() => router.back()}
			>
				<FontAwesomeSixIcons name={'arrow-left'} className='text-xl' color={theme === 'light' ? light.text : dark.text} />
			</Pressable>
		</View>
	)
}

export default SettingHeader