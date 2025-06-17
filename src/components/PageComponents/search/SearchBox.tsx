import React, { useState } from 'react'
import { View, TextInput, useColorScheme } from 'react-native'
import {light, dark } from '@constants/Color'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { useForm, Controller } from 'react-hook-form'
import useDebounce from '@hooks/useDebounce'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { searchTermAtom } from '@stores/search.state'

interface FormData {
  searchTerm: string
}

const SearchBox = (): JSX.Element => {
	const theme = useColorScheme()
	const [isFocused, setIsFocused] = useState(false)
	const [search, setSearch] = useState('')
	const [, setSearchTerm] = useAtom(searchTermAtom)
	const { control } = useForm<FormData>({
		defaultValues: {
			searchTerm: ''
		}
	})

	useDebounce(() => {
		setSearchTerm(search)
	}, 1000, [search])

	return (
		<View style={tw`w-full h-24 items-center justify-end`}>
			<Controller
				control={control}
				name='searchTerm'
				render={({ field: { onChange, onBlur, value } }) => (
					<View
            style={[tw`flex flex-row w-11/12 rounded-full justify-center items-center h-12 my-1 px-4
							${theme === 'light' ? 'bg-lightheader/30' : 'bg-darkheader'}
							${isFocused ? 'border' : ''}`, {
							borderColor: isFocused ? light.activeIconColor : dark.activeIconColor
						}]}
          >
						<TextInput
              style={[tw`w-11/12 h-full text-xl text-left`, {
								color: theme === 'light' ? light.text : dark.text
							}]}
							onBlur={onBlur}
							onFocus={() => {
								setIsFocused(true)
							}}
							onChangeText={(value) => {
								onChange(value)
								setSearch(value)
							}}
							value={value}
							placeholder='Search'
							cursorColor={'#198D9E'}
							selectionColor={'#198D9E'}
							placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
							testID='search-box'
						/>
						<FontAwesomeSixIcons name="magnifying-glass" color={isFocused ? light.activeIconColor : light.iconsColor} style={tw`text-xl`} />
					</View>
				)}
			/>
		</View>
	)
}

export default SearchBox
