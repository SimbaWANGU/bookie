import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import Genre from './Genre'
import tw from 'twrnc'

const Genres: React.FC = () => {
	const [genres, setGenres] = useState()
	const [books] = useState()

	// useEffect(() => {
	// 	setGenres([...new Set(books.map((book) => book.genre).flat())])
	// }, [])

	// return (
	// 	<>
	// 		<FlatList
	// 			style={tw`my-2 w-11/12 self-center`}
	// 			horizontal={true}
	// 			showsHorizontalScrollIndicator={false}
	// 			data={genres}
	// 			renderItem={({ item }) => (
	// 				<Genre genre={item} />
	// 			)}  
	// 			keyExtractor={(item, index) => `${item}-${index}`}
	// 		/>
	// 	</>
	// )

	return (
		<></>
	)
}

export default Genres