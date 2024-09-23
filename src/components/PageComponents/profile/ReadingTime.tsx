import React from 'react'
import { View } from '@components/styled/Themed'
import { light, dark } from '@constants/Color'
import { QuickSandText } from '@components/styled/StyledText'
import { convertToTime } from '@constants/Functions'
import useUser from '@hooks/useUser'

const ReadingTime = () => {
	const [user] = useUser()
	return (
		<View
			className='h-2/12 w-11/12 m-2 rounded self-center justify-end'
			style={{
				backgroundColor: light.activeIconColor
			}}
		>
			<QuickSandText
				className='text-2xl p-2'
				lightColor={dark.text}
				darkColor={dark.text}
			>Total Time Reading</QuickSandText>
			<QuickSandText
				className='text-4xl p-2'
				lightColor={dark.text}
				darkColor={dark.text}
			>{convertToTime(user?.cumulative_time ?? 0)}</QuickSandText>
		</View>
	)
}

export default ReadingTime