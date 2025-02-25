import React, { useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { Book } from '@models/book.type'
import CarouselItem from './CarouselItem'
import { getDynamicValue } from '@constants/Functions'
import tw from 'twrnc'
 
const PAGE_WIDTH = Dimensions.get('window').width

interface TopCarouselProps {
  books: Book[]
}

const TopCarousel: React.FC<TopCarouselProps> = () => {
	const ref = React.useRef<ICarouselInstance>(null)
	const animationStyle = useCallback(
		(value: number) => {
			'worklet'
 
			const zIndex = Math.round(interpolate(value, [-1, 0, 1], [10, 20, 30]))
			const translateX = interpolate(
				value,
				[-2, 0, 1],
				[-PAGE_WIDTH, 0, PAGE_WIDTH],
			)
 
			return {
				transform: [{ translateX }],
				zIndex,
			}
		},
		[],
	)
 
	return (
		<View
			style={[tw`self-center`, {
				height: getDynamicValue(400),
			}]}
		>
			{/* <Carousel
				ref={ref}
				loop={true}
				autoPlay={true}
				style={[tw`self-center rounded-xl`]}
				width={PAGE_WIDTH * 11/12}
				data={[...books]}
				renderItem={({ index, animationValue, item }) => 
					<CarouselItem
						key={index}
						index={index}
						book={item}
						animationValue={animationValue}
					/>
				}
				customAnimation={animationStyle}
				autoPlayInterval={7000}
				scrollAnimationDuration={2500}
			/> */}
		</View>
	)
}
 
export default TopCarousel
 