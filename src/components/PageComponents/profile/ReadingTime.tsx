import React, { useState } from 'react'
import { View } from '@components/styled/Themed'
import { light, dark } from '@constants/Color'
import { QuickSandText } from '@components/styled/StyledText'
import { convertToTime } from '@constants/Functions'
import tw from 'twrnc'

const ReadingTime = () => {
	const [user] = useState()
	return (
		<View
			style={[tw`h-2/12 w-11/12 m-2 rounded self-center justify-end`, {
				backgroundColor: light.activeIconColor
			}]}
		>
			<QuickSandText
				style={tw`text-2xl p-2`}
				lightColor={dark.text}
				darkColor={dark.text}
			>Total Time Reading</QuickSandText>
			<QuickSandText
				style={tw`text-4xl p-2`}
				lightColor={dark.text}
				darkColor={dark.text}
			>{convertToTime(0)}</QuickSandText>
		</View>
	)
}

export default ReadingTime