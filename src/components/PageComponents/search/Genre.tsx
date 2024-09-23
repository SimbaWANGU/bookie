import React from 'react'
import { light, dark } from '@constants/Color'
import { Pressable, useColorScheme } from 'react-native'
import { MonoText } from '@components/styled/StyledText'
import useFilteredGenre from '@hooks/useFilteredGenre'

interface GenreProps {
  genre: string
}

const Genre: React.FC<GenreProps> = ({ genre }) => {
	const theme = useColorScheme()
	const [selectedGenre, setSelectedGenre] = useFilteredGenre()

	return (
		<Pressable
      className={`${selectedGenre === genre ? 'mx-4' : 'border mx-1'} rounded-lg w-auto mb-2 h-9`}
			style={{
				borderColor: theme === 'light' ? light.tint : dark.tint,
				backgroundColor: selectedGenre === genre ? light.activeIconColor : theme === 'light' ? light.background : dark.background,
				transform: selectedGenre === genre ? [{ scale: 1.1 }] : [{ scale: 1 }]
			}}
			onPress={() => selectedGenre === genre ? setSelectedGenre('') :setSelectedGenre(genre)}
		>
			<MonoText
        className='text-sm p-2'
				style={{
					color: selectedGenre === genre ? theme === 'light' ? dark.text : light.text : theme === 'light' ? light.text : dark.text
				}}
			>{genre}</MonoText>
		</Pressable>
	)
}

export default Genre