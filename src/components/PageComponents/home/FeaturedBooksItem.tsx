import React from 'react'
import Animated, { SharedValue, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { View } from '@components/styled/Themed'
import { Book } from '@models/book.type'
import { Pressable } from 'react-native'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { light, dark } from '@constants/Color'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { QuickSandText, MonoText } from '@components/styled/StyledText'
import { ImageBackground } from 'expo-image'
import tw from 'twrnc'
import { useAtom } from 'jotai'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'

interface ItemProps {
  index: number
  animationValue: SharedValue<number>
  book: Book
}

const FeaturedBooksItem: React.FC<ItemProps> = ({ animationValue, book }) => {
	const [, setFirstTimeonApp] = useAtom(firstTimeOnAppAtom)
	const maskStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			animationValue.value,
			[-1, 0, 1],
			['#000000dd', 'transparent', '#000000dd'],
		)
 
		return {
			backgroundColor,
		}
	}, [animationValue])
 
	return (
			<Animated.View
				style={[
					tw`flex-1 rounded`,
					maskStyle,
				]}
			>
				<ImageBackground
					source={{ uri: book.cover_image_url as string }}
          contentFit='cover'
					style={tw`flex-1 rounded`}
				>
					<LinearGradient
						colors={['transparent', 'black']}
						style={tw`w-full h-full absolute rounded`}
						locations={[0.2, 0.9]}
					>

						<MonoText
							style={tw`absolute px-6 my-2 text-sm italic bottom-22 z-10`}
							lightColor={dark.activeIconColor}
							darkColor={dark.activeIconColor}
						>Featured Books</MonoText>
						<QuickSandText
							style={tw`absolute px-6 my-2 text-xl bottom-16 z-10`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{book.title}</QuickSandText>
						<View
							style={tw`absolute bottom-0 flex flex-row items-center justify-between w-full p-4 absolute z-10`}
							lightColor={'tranparent'}
							darkColor={'transparent'}
						>
							<Pressable
                style={[
									tw`flex flex-row py-3 px-4 items-center justify-between w-5/12 rounded-full`, {
									backgroundColor: dark.text
								}]}
								onPress={() => {
									setFirstTimeonApp(false)
									router.push(`/book/${book.id}`)
								}}
							>
								<QuickSandText
                  style={tw`text-base`}
									lightColor={light.activeIconColor}
                  darkColor={dark.activeIconColor}
							  >View Book</QuickSandText>
								<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
							</Pressable>
							{/* <FontAwesomeSixIcons
                name="share-nodes"
                style={tw`text-3xl`}
                color={light.activeIconColor}
              /> */}
						</View>
					</LinearGradient>
				</ImageBackground>
			</Animated.View>
	)
}

export default FeaturedBooksItem
