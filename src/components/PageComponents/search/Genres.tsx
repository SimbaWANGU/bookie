import { useBooks } from '@hooks/useBooks'
import useGenre from '@hooks/useGenre'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import Genre from './Genre'
import tw from 'twrnc'

const Genres: React.FC = () => {
	const [genres, setGenres] = useGenre()
	const { books } = useBooks()

	useEffect(() => {
		setGenres([...new Set(books.map((book) => book.genre).flat())])
	}, [])

	return (
		<>
			<FlatList
				style={tw`my-2 w-11/12 self-center`}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={genres}
				renderItem={({ item }) => (
					<Genre genre={item} />
				)}  
				keyExtractor={(item, index) => `${item}-${index}`}
			/>
		</>
	)
}

export default Genres