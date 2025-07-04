import { QuickSandTextRegular } from '@components/styled/StyledText'
import * as Updates from 'expo-updates'
import React from 'react'
import { Button, View, useColorScheme } from 'react-native'
import tw from 'twrnc'

const CustomFallBack = () => {
  const theme = useColorScheme()

	return (
		<View style={tw`flex-1 items-center justify-center ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
			<QuickSandTextRegular style={tw`text-2xl font-bold ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
        Something happened!
      </QuickSandTextRegular>
			<Button
				onPress={async () => await Updates.reloadAsync()}
				title={'Try again'} />
		</View>
	)
}

export default CustomFallBack
  