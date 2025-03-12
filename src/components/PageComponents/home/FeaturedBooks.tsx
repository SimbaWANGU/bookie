import React, { useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { Book } from '@models/book.type'
import FeaturedBooksItem from './FeaturedBooksItem'
import { getDynamicValue } from '@constants/Functions'
import tw from 'twrnc'
import { fetchBooks } from '@api/books/api.books'
import { useQuery } from '@tanstack/react-query'
import ShimmerPlaceHolder from '@components/styled/Shimmer'
 
const PAGE_WIDTH = Dimensions.get('window').width

const FeaturedBooks = () => {
	const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['featured-books'],
    queryFn: fetchBooks,
  })
	
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

	if (isLoading) {
		return (
			<ShimmerPlaceHolder style={[tw`self-center rounded-xl`, {
				height: getDynamicValue(400),
				width: PAGE_WIDTH * 11/12
			}]} />
		)
	}
 
	return (
		<View
			style={[tw`self-center bg-transparent`, {
				height: getDynamicValue(400),
			}]}
		>
			<Carousel
				ref={ref}
				loop={true}
				autoPlay={true}
				style={[tw`self-center rounded-xl`]}
				width={PAGE_WIDTH * 11/12}
				data={books}
				renderItem={({ index, animationValue, item }) => 
					<FeaturedBooksItem
						key={index}
						index={index}
						book={item}
						animationValue={animationValue}
					/>
				}
				customAnimation={animationStyle}
				autoPlayInterval={10000}
				scrollAnimationDuration={2000}
			/>
		</View>
	)
}
 
export default FeaturedBooks
 