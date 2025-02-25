import { View, Pressable } from 'react-native'
import React from 'react'
import { Book } from '@models/book.type'
import { LinearGradient } from 'expo-linear-gradient'
import { QuickSandText } from './StyledText'
import { dark, light } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import { ImageBackground } from 'expo-image'
import tw from '@utils/tailwind'

interface BookProps {
  book: Book
}

const BookContainer: React.FC<BookProps> = ({ book }) => {
	return (
		<Pressable
			onPress={() => {
				router.push(`/book/${book.id}`)
			}}
			style={[tw`w-5/12 my-2 rounded-xl`, {
				height: getDynamicValue(280),
				overflow: 'hidden',
			}]}
		>
			<ImageBackground
				source={{ uri: 'https://ui-avatars.com/api/?name=U+N' }}
        style={tw`w-full h-full rounded-xl`}
        contentFit='cover'
			>
				<LinearGradient
					colors={['transparent', 'black']}
          style={tw`w-full h-full absolute`}
					locations={[0.2, 0.9]}
				>
					<View
						style={tw`absolute bottom-0 flex flex-col items-start justify-between w-full p-2 absolute z-10`}
					>
						<QuickSandText
							style={tw`text-base bottom-2 z-10`}
							numberOfLines={1}
							lightColor={dark.text}
							darkColor={dark.text}
						>{book.title}</QuickSandText>
						{/* <View style={tw`flex flex-row flex-wrap`}>
							{book.genre.map((genre, index) => (
								<View
									key={index}
									style={[tw`bottom-0 z-10 p-1 m-1 rounded-lg`, {
										backgroundColor: dark.lightTintColor
									}]}
								>
									<QuickSandText
										lightColor={light.activeIconColor}
										darkColor={light.activeIconColor}
										style={[tw`text-xs`]}
										>
										{genre}
									</QuickSandText>
								</View>
							))}
						</View> */}
					</View>
				</LinearGradient>
			</ImageBackground>
		</Pressable>
	)
}

export default BookContainer