import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import tw from '@utils/tailwind'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface OnboardItemProps {
  text: string[]
}

const OnboardItem: React.FC<OnboardItemProps> = ({ text }) => {
	const [, setFirstTimeOnApp] = useAtom(firstTimeOnAppAtom)

	return (
		<View style={tw`flex-1 justify-center`}>
			<ImageBackground
				source={text[0] as string}
				style={tw`flex-1`}
			>
				<LinearGradient
					colors={['transparent', dark.background]}
					locations={[0.1, 1]}
					style={tw`flex-1`}
				>
					<View style={tw`bg-transparent absolute flex flex-col bottom-50 px-4'`}>
						<QuickSandTextRegular
							style={tw`text-2xl`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{text[1]}</QuickSandTextRegular>
						<QuickSandTextRegular
							style={tw`text-5xl font-bold my-2`}
							lightColor={light.activeIconColor}
							darkColor={dark.activeIconColor}
						>{text[2]}</QuickSandTextRegular>
						<QuickSandTextRegular
							style={tw`text-xl`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{text[3]}</QuickSandTextRegular>
						<TouchableOpacity
							style={[tw`flex flex-row py-4 mt-8 px-4 items-center justify-between w-7/12 rounded-full`, {
								backgroundColor: dark.text
							}]}
							activeOpacity={.8}
							onPress={() => {
								setFirstTimeOnApp(false)
								router.push('/auth/authenticate')
							}}
						>
							<QuickSandTextRegular
								style={[tw`text-base`, {
									color: light.activeIconColor
								}]}
							>Start Reading</QuickSandTextRegular>
							<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
						</TouchableOpacity>
					</View>

				</LinearGradient>
			</ImageBackground>
		</View>
	)
}

export default OnboardItem