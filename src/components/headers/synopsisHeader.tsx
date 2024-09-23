import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { View } from '@components/styled/Themed'
import { dark } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const SynopsisHeader = () => {
	return (
		<View
			className='flex w-full bg-transparent flex-row justify-between items-center px-4 mt-6'
      style={{
        height: getDynamicValue(120)
      }}
		>
			<Pressable
				className='p-2 h-10'
				onPress={() => router.back()}
			>
				<FontAwesomeSixIcons name={'arrow-left'} className='text-xl' color={dark.text} />
			</Pressable>
		</View>
	)
}

export default SynopsisHeader