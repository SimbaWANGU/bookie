import { FontAwesome6 } from '@expo/vector-icons'
import { getDynamicValue } from '@constants/Functions'
import tw from '@utils/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'

const SettingHeader = () => {	
	return (
		<View
			style={[tw`flex w-full flex-row px-4 mt-6 bg-primary-color justify-between items-center`, {
        height: getDynamicValue(120)
      }]}
		>
			<Pressable
				style={tw`p-2 h-10`}
				onPress={() => router.back()}
			>
				<FontAwesome6 name={'arrow-left'} style={tw`back-icon`} />
			</Pressable>
		</View>
	)
}

export default SettingHeader