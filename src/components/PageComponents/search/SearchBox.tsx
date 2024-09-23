import React, { useState } from 'react'
import { View, TextInput, useColorScheme } from 'react-native'
import {light, dark } from '@constants/Color'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { useForm, Controller } from 'react-hook-form'
import useSearch from '@hooks/useSearch'
import useDebounce from '@hooks/useDebounce'

interface FormData {
  searchTerm: string
}

const SearchBox = (): JSX.Element => {
	const theme = useColorScheme()
	const [isFocused, setIsFocused] = useState(false)
	const [searchTermState, setSearchTermState] = useState('')
	const [searchTerm, setSearchTerm] = useSearch()
	const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
		defaultValues: {
			searchTerm: ''
		}
	})

	useDebounce(() => {
		console.log('searchTermState', searchTermState)
		setSearchTerm(searchTermState)
	}, 1000, [searchTermState])

	return (
		<>
			<Controller
				control={control}
				name='searchTerm'
				render={({ field: { onChange, onBlur, value } }) => (
					<View
            className={`flex flex-row w-11/12 self-center h-10 items-center justify-center my-1 px-4 ${isFocused ? 'border-b' : ''}`}
            style={{ borderColor: isFocused ? light.activeIconColor : dark.activeIconColor }}
          >
						<TextInput
							style={{ color: theme === 'light' ? light.text : dark.text }}
              className={`w-11/12 h-full text-lg text-left`}
							onBlur={onBlur}
							onFocus={() => {
								console.log('focused')
								setIsFocused(true)
							}}
							onChangeText={(value) => {
								onChange(value)
								//setSearchTermState(value)
							}}
							value={value}
							placeholder='Search Books'
							placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
							testID='search-box'
						/>
						<FontAwesomeSixIcons name="magnifying-glass" color={isFocused ? light.activeIconColor : light.iconsColor} className='text-xl' />
					</View>
				)}
			/>
		</>
	)
}

export default SearchBox
