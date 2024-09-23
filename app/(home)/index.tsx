import React from 'react'
import { View } from '@components/styled/Themed'
import ShimmerPlaceholder from '@components/styled/Shimmer'
import { getDynamicValue, getRandomItems } from '@constants/Functions'
import TopCarousel from '@components/PageComponents/home/TopCarousel'
import BookContainer from '@components/styled/BookContainer'
import { useBooks } from '@hooks/useBooks'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { dark, light } from '@constants/Color'

const index = () => {
	const theme = useColorScheme()
	const { books, isLoading, isError: error } = useBooks()
  
	if (isLoading || books.length === 0) {
		return (
			<View className={'h-full w-full items-center justify-center'}>
				<ShimmerPlaceholder
					style={{
						height: '40%',
						borderRadius: 20,
						width: '90%',
						marginBottom: 10,
					}}
				/>
				<View
					className='my-auto w-11/12 flex flex-row flex-wrap items-center justify-around'
				>
					{Array.from({ length: 4 }).map((_, index) => (
						<ShimmerPlaceholder
							key={index}
							style={{
								height: getDynamicValue(280),
								width: '41%',
								margin: 10,
								borderRadius: 20,
							}}
						/>
					))}
				</View>
			</View>
		)
	}

	if (error || !books) {
		return (
			<></>
		)
	}

	
	const randomBooks = getRandomItems(books)
	const booksOnDisplay = books.filter((book) => book.onDisplayPage)

	return (
		<View className='h-full w-full items-center justify-center'>
			<TopCarousel books={randomBooks}/>
			<View 
				className='my-auto w-11/12 flex flex-row flex-wrap items-center justify-around'
			>
				{booksOnDisplay!.map((book, index) => (
					<BookContainer key={index} book={book}/>
				))}
			</View>
		</View>
	)
}

export default index