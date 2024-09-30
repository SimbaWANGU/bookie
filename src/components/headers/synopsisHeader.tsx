import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { View } from '@components/styled/Themed'
import { dark } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

const SynopsisHeader = () => {
	return (
		<View
			style={[tw`flex w-full bg-transparent flex-row justify-between items-center px-4 mt-6`, {
        height: getDynamicValue(120)
      }]}
		>
			<TouchableOpacity
				activeOpacity={.8}
				style={tw`p-6 border`}
				onPress={() => router.back()}
			>
				<FontAwesomeSixIcons name={'arrow-left'} style={tw`text-xl`} color={dark.text} />
			</TouchableOpacity>
		</View>
	)
}

export default SynopsisHeader