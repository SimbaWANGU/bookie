import React from 'react'
import { Dimensions, useColorScheme } from 'react-native'
import { View } from '@components/styled/Themed'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { textSizeAtom } from '@stores/settings.state'
import { textSizeMap } from '@constants/TextSizeMap'
import { getScreenSizeCategory } from '@utils/index'

interface storySwiperProps {
  content: string
}

const PAGE_WIDTH = Dimensions.get('window').width

const Page: React.FC<storySwiperProps> = ({ content }) => {
	const theme = useColorScheme()
	const [textSize] = useAtom(textSizeAtom)
	const fontSize = textSizeMap[getScreenSizeCategory()][textSize]

	console.log(fontSize)

	//console.log('lol', fontSize)

	return (
		<View
			style={[
				tw`flex-1 justify-center items-center ${theme === 'light' ? 'bg-light' : 'bg-dark'}`,
				{ width: PAGE_WIDTH },
			]}
		>
			{content.length < 50 ? (
				<QuickSandText style={tw`${theme === 'light' ? 'text-dark' : 'text-light'} text-center text-4xl w-11/12`}>
					{content}
				</QuickSandText>
			) : (
				<MonoText style={tw`${fontSize} ${theme === 'light' ? 'text-dark' : 'text-light'} text-center w-full p-2`}>
					{content}
				</MonoText>
			)}
		</View>
	)
}

export default Page
