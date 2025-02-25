import React, { useState } from 'react'
import { View } from '@components/styled/Themed'
import { light } from '@constants/Color'
import { QuickSandText } from '@components/styled/StyledText'
import { achievementTimeThresholds } from '@constants/Achievements'
import tw from 'twrnc'

const Achievements = () => {
	const [user] = useState()

	return (
		<View
			style={[tw`h-2/12 w-11/12 m-2 rounded bg-transparent self-center justify-end border-2`, {
				borderColor: light.activeIconColor
			}]}
		>
			<QuickSandText
				style={tw`text-2xl p-2`}
				lightColor={light.activeIconColor}
				darkColor={light.activeIconColor}
			>Latest Achievement</QuickSandText>
			<QuickSandText
				style={tw`text-4xl p-2`}
				lightColor={light.activeIconColor}
				darkColor={light.activeIconColor}
			>{''}</QuickSandText>
			<QuickSandText
				style={tw`text-xl p-2`}
				lightColor={light.activeIconColor}
				darkColor={light.activeIconColor}
			>{''}</QuickSandText>
		</View>
	)
}

export default Achievements