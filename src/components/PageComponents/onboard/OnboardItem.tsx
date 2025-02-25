import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { QuickSandText } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import useAsyncStorage from '@hooks/useAsyncStorage'
import useFirstTimeOnApp from '@hooks/useFirstTimeOnApp'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

interface OnboardItemProps {
  text: string[]
}

const OnboardItem: React.FC<OnboardItemProps> = ({ text }) => {
	const [, setFirstTimeOnApp] = useFirstTimeOnApp()
	const [setFirstTimeOnAppAsync] = useAsyncStorage()

	return (
		<View
			style={tw`flex-1 justify-center`}
		>
			<ImageBackground
				source={text[0] as string}
				style={tw`flex-1`}
			>
				<LinearGradient
					colors={['transparent', dark.background]}
					locations={[0.1, 1]}
					style={tw`flex-1`}
				>
					<View style={tw`bg-transparent absolute flex flex-col bottom-80 px-4'`}>
						<QuickSandText
							style={tw`text-2xl`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{text[1]}</QuickSandText>
						<QuickSandText
							style={tw`text-6xl my-2`}
							lightColor={light.activeIconColor}
							darkColor={dark.activeIconColor}
						>{text[2]}</QuickSandText>
						<QuickSandText
							style={tw`text-xl`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{text[3]}</QuickSandText>
						<TouchableOpacity
							style={[tw`flex flex-row py-4 mt-8 px-4 items-center justify-between w-7/12 rounded-full`, {
								backgroundColor: dark.text
							}]}
							activeOpacity={.8}
							onPress={() => {
								void setFirstTimeOnAppAsync(false, 'firstTimeOnApp')
								setFirstTimeOnApp(false)
								router.push('/auth/signin')
							}}
						>
							<QuickSandText
								style={[tw`text-base`, {
									color: light.activeIconColor
								}]}
							>Start Reading</QuickSandText>
							<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
						</TouchableOpacity>
					</View>

				</LinearGradient>
			</ImageBackground>
		</View>
	)
}

export default OnboardItem