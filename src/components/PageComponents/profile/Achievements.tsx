import React from 'react'
import { View } from '@components/styled/Themed'
import { light } from '@constants/Color'
import { QuickSandText } from '@components/styled/StyledText'
import { achievementTimeThresholds } from '@constants/Achievements'
import useUser from '@hooks/useUser'
import tw from 'twrnc'

const Achievements = () => {
	const [user] = useUser()
	const latestAchievement = user?.achievements?.[user?.achievements?.length - 1]
	const latestAchievementTitle = achievementTimeThresholds.find(achievement => achievement.title === latestAchievement)

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
			>{latestAchievementTitle?.title}</QuickSandText>
			<QuickSandText
				style={tw`text-xl p-2`}
				lightColor={light.activeIconColor}
				darkColor={light.activeIconColor}
			>{latestAchievementTitle?.description}</QuickSandText>
		</View>
	)
}

export default Achievements