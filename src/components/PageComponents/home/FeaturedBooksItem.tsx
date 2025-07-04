import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { QuickSandTextRegular, SpaceMonoTextBold } from '@components/styled/StyledText'
import { Text, View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Book } from '@models/book.type'
import tw from '@utils/tailwind'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import Animated, { SharedValue, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'

interface ItemProps {
  index: number
  animationValue: SharedValue<number>
  book: Book
}

const FeaturedBooksItem: React.FC<ItemProps> = ({ animationValue, book }) => {
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

						<SpaceMonoTextBold
							style={tw`absolute px-6 my-2 text-lg italic bottom-22 z-10`}
							lightColor={dark.activeIconColor}
							darkColor={dark.activeIconColor}
						>Featured Books</SpaceMonoTextBold>
						<QuickSandTextRegular
							style={tw`absolute px-6 my-2 text-xl bottom-16 z-10`}
							lightColor={dark.text}
							darkColor={dark.text}
						>{book.title}</QuickSandTextRegular>
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
									if (book.is_audio) {
										router.push(`/audio/${book.id}`)
									} else {
										router.push(`/book/${book.id}`)
									}
								}}
							>
								<QuickSandTextRegular
                  style={tw`text-base`}
									lightColor={light.activeIconColor}
                  darkColor={dark.activeIconColor}
							  >View Book</QuickSandTextRegular>
								<FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
							</Pressable>
							{/* <FontAwesomeSixIcons
                name="share-nodes"
                style={tw`text-3xl`}
                color={light.activeIconColor}
              /> */}
						</View>
						{book.is_audio && (
							<View
								style={tw`absolute top-3 right-3 bg-accent/70 dark:bg-black/60 px-3 py-1 rounded-full flex-row items-center z-10`}
							>
								<FontAwesome6
									name="headphones"
									style={tw`mr-1 text-white`}
								/>
								<QuickSandTextRegular
									style={tw`text-xs font-semibold text-white`}
								>
									Audio
								</QuickSandTextRegular>
							</View>
						)}
					</LinearGradient>
				</ImageBackground>
			</Animated.View>
	)
}

export default FeaturedBooksItem
