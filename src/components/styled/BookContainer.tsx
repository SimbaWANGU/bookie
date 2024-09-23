import { View, Pressable } from 'react-native'
import React from 'react'
import { Book } from '@models/book.type'
import { LinearGradient } from 'expo-linear-gradient'
import { QuickSandText } from './StyledText'
import { dark, light } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import { ImageBackground } from 'expo-image'

interface BookProps {
  book: Book
}

const BookContainer: React.FC<BookProps> = ({ book }) => {
	return (
		<Pressable
			onPress={() => {
				router.push(`/book/${book.id}`)
			}}
      className='w-5/12 my-2 rounded-xl'
			style={{
				height: getDynamicValue(280),
				overflow: 'hidden',
			}}
		>
			<ImageBackground
				source={{ uri: book.synopsisBgImage as string }}
        className='w-full h-full rounded-xl'
        contentFit='cover'
			>
				<LinearGradient
					colors={['transparent', 'black']}
          className='w-full h-full absolute'
					locations={[0.2, 0.9]}
				>
					<View
						className='absolute bottom-0 flex flex-col items-start justify-between w-full p-2 absolute z-10'
					>
						<QuickSandText
							className='text-base bottom-2 z-10'
							numberOfLines={1}
							lightColor={dark.text}
							darkColor={dark.text}
						>{book.title}</QuickSandText>
						<View className='flex flex-row'>
							{book.genre.map((genre, index) => (
								<QuickSandText
									key={index}
									lightColor={light.activeIconColor}
									darkColor={light.activeIconColor}
                  className='text-xs bottom-0 z-10 p-1 mr-1 rounded-lg'
									style={{
										backgroundColor: dark.lightTintColor
									}}
								>
									{genre}
								</QuickSandText>
							))}
						</View>
					</View>
				</LinearGradient>
			</ImageBackground>
		</Pressable>
	)
}

export default BookContainer