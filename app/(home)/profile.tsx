import React, { useEffect, useState } from 'react'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { useColorScheme } from 'react-native'
import { getRandomItems } from '@constants/Functions'
import BookContainer from '@components/styled/BookContainer'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import ReadingTime from '@components/PageComponents/profile/ReadingTime'
import Achievements from '@components/PageComponents/profile/Achievements'
import ProfilePicture from '@components/PageComponents/profile/ProfilePicture'
import { useQueryClient } from '@tanstack/react-query'
import { useBooks } from '@hooks/useBooks'
import useUser from '@hooks/useUser'

const profile = () => {
	const theme = useColorScheme()
	const queryClient = useQueryClient()
	const { books } = useBooks()
	const [user] = useUser()
	const presentedBooks = getRandomItems(books!)
	presentedBooks.pop()

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: [`user-${user?.id}`],
		})
	}, [])


	return (
		<View
			className='flex-1 items-center justify-evenly'
			lightColor={light.background}
			darkColor={dark.background}
		>

			<ProfilePicture />

			<QuickSandText
				className='text-2xl'
				lightColor={light.activeIconColor}
				darkColor={dark.activeIconColor}
			>{`@${user?.username ?? 'username'}`}</QuickSandText>

			<View className='flex flex-row w-auto p-2 items-center justify-evenly'>
				<View className='flex flex-row items-center justify-evenly w-2/12 mx-2'>
					<FontAwesomeSixIcons name={'star'} color={theme === 'light' ? light.iconsColor : dark.iconsColor} />
					<MonoText className='text-xl'>{user?.favorites?.length ?? 0}</MonoText>
				</View>
				<View className='flex flex-row items-center justify-evenly w-2/12 mx-2'>
					<FontAwesomeSixIcons name={'bookmark'} color={theme === 'light' ? light.iconsColor : dark.iconsColor} />
					<MonoText className='text-xl'>{user?.queue?.length ?? 0}</MonoText>
				</View>
				<View className='flex flex-row items-center justify-evenly w-2/12 mx-2'>
					<FontAwesomeSixIcons name={'book-bookmark'} color={theme === 'light' ? light.iconsColor : dark.iconsColor} />
					<MonoText className='text-xl'>{user?.completed?.length ?? 0}</MonoText>
				</View>
			</View>

			<View
				className='flex flex-row flex-wrap w-full items-center justify-evenly'
			>
				{presentedBooks.map((book, index) => (
					<BookContainer 
						key={index}
						book={book}
					/>
				))}
			</View>

			<ReadingTime />
			<Achievements />
		</View>
	)
}

export default profile
