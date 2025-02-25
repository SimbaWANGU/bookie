import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'
import tw from 'twrnc'

const StoryHeader = () => {
  const theme = useColorScheme()

  return (
    <View
			style={[tw`flex w-full absolute bg-transparent flex-row justify-between items-center px-4 mt-6`, {
        height: getDynamicValue(120)
      }]}
		>
			<TouchableOpacity
				activeOpacity={.8}
				style={tw`p-7 right-4`}
				onPress={() => router.back()}
			>
				<FontAwesomeSixIcons name={'arrow-left'} style={tw`text-xl`} color={theme === 'light' ? light.text : dark.text} />
			</TouchableOpacity>
		</View>
  )
}

export default StoryHeader