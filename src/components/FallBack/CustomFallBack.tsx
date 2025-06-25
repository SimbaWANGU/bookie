import { View, Button, useColorScheme } from 'react-native'
import React from 'react'
import * as Updates from 'expo-updates'
import tw from 'twrnc'
import { QuickSandText } from '@components/styled/StyledText'

const CustomFallBack = () => {
  const theme = useColorScheme()

	return (
		<View style={tw`flex-1 items-center justify-center ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
			<QuickSandText style={tw`text-2xl font-bold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
        Something happened!
      </QuickSandText>
			<Button
				onPress={async () => await Updates.reloadAsync()}
				title={'Try again'} />
		</View>
	)
}

export default CustomFallBack
  