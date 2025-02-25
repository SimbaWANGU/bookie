import React, { useState } from 'react'
import { View, TextInput, useColorScheme } from 'react-native'
import {light, dark } from '@constants/Color'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { useForm, Controller } from 'react-hook-form'
import useDebounce from '@hooks/useDebounce'
import tw from 'twrnc'

interface FormData {
  searchTerm: string
}

const SearchBox = (): JSX.Element => {
	const theme = useColorScheme()
	const [isFocused, setIsFocused] = useState(false)
	const [searchTermState, setSearchTermState] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
		defaultValues: {
			searchTerm: ''
		}
	})

	useDebounce(() => {
		setSearchTerm(searchTermState)
	}, 1000, [searchTermState])

	return (
		<>
			<Controller
				control={control}
				name='searchTerm'
				render={({ field: { onChange, onBlur, value } }) => (
					<View
            style={[tw`flex flex-row w-11/12 self-center h-10 items-center justify-center my-1 px-4 ${isFocused ? 'border-b' : ''}`, {
							borderColor: isFocused ? light.activeIconColor : dark.activeIconColor
						}]}
          >
						<TextInput
              style={[tw`w-11/12 h-full text-lg text-left`, {
								color: theme === 'light' ? light.text : dark.text
							}]}
							onBlur={onBlur}
							onFocus={() => {
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
						<FontAwesomeSixIcons name="magnifying-glass" color={isFocused ? light.activeIconColor : light.iconsColor} style={tw`text-xl`} />
					</View>
				)}
			/>
		</>
	)
}

export default SearchBox
