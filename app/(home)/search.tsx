import { View, useColorScheme } from 'react-native'
import React from 'react'
import { dark, light } from '@constants/Color'

const search = () => {
	const theme = useColorScheme()
	// const [booksOnDisplay, setBooksOnDisplay] = useState()
	// const [genre] = useState()
	// const [searchTerm] = useState()

	// useEffect(() => {
	// 	if (searchTerm) {
	// 		const filteredBooks = books!.filter((book) =>
	// 			book.title.toLowerCase().includes(searchTerm.toLowerCase())
	// 		)
	// 		setBooksOnDisplay(filteredBooks || [])
	// 	} else {
	// 		setBooksOnDisplay(books || [])
	// 	}
	// }, [searchTerm, books])

	// useEffect(() => {
	// 	if (genre) {
	// 		const filteredBooks = books!.filter((book) =>
	// 			book.genre.includes(genre)
	// 		)
	// 		setBooksOnDisplay(filteredBooks || [])
	// 	} else {
	// 		setBooksOnDisplay(books || [])
	// 	}
	// }, [genre, books])

	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				backgroundColor: theme === 'light' ? light.background : dark.background
			}}
		>
			{/* <SearchBox /> */}
			{/* <Genres /> */}
			{/* <FlatList
				data={booksOnDisplay}
				keyExtractor={(item, index) => item.id + index.toString() }
				renderItem={({ item }) => <BookContainer book={item} />}
				contentContainerStyle={{
					alignSelf: 'center',
					marginTop: getDynamicValue(10),
					width: '90%',
				}}
				columnWrapperStyle={{
					justifyContent: 'space-around',
				}}
				numColumns={2} // Adjust the number of columns as per your design
				showsVerticalScrollIndicator={false}
			/> */}
		</View>
	)
}

export default search
