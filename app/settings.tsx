import React, { useEffect, useState } from 'react'
import { Pressable, TextInput, useColorScheme } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Redirect } from 'expo-router'
import { supabase } from '@utils/supabase'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { MonoText } from '@components/styled/StyledText'
import SignOutAndDelete from '@components/PageComponents/settings/SignOutAndDelete'
import UploadImage from '@components/PageComponents/settings/UploadImage'
import Toast from 'react-native-toast-message'
import useSession from '@hooks/useSession'
import useUser from '@hooks/useUser'
import { getDynamicValue } from '@constants/Functions'

const settings = () => {
  const [session] = useSession()
	
	if (!session) {
		return <Redirect href="/auth/signin" />
	}
  
  const [user] = useUser()
	const theme = useColorScheme()
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [username, setUsername] = useState<string | undefined | null>('')
	const [usernameFocused, setUsernameFocused] = useState(false)

	const updateProfileMutation = useMutation({
		mutationFn: async () => {
			setLoading(true)
			const { data, error } = await supabase.from('profiles').update({
				username,
			}).eq('id', session?.user.id).single()
			if (error) {
				// Sentry.Native.captureMessage('Error returned from updating profile')
				// Sentry.Native.captureException(error)
			}
			return data
		},
		onSuccess: () => {
			setLoading(false)
			Toast.show({
				type: 'success',
				text1: 'Profile updated!',
				text1Style: {
          fontSize: getDynamicValue(20),
          fontWeight: 'bold',
        },
				text2: 'Your profile has been updated successfully!',
				text2Style: {
          fontSize: getDynamicValue(16),
        }
			})
			queryClient.invalidateQueries({
				queryKey: [`user-${session?.user.id}`],
			})
		},
		onError: (_) => {
			setLoading(false)
			Toast.show({
				type: 'error',
				text1: 'Error updating profile',
				text1Style: {
          fontSize: getDynamicValue(20),
          fontWeight: 'bold',
        },
				text2: 'An error occurred while updating your profile. Please try again.',
				text2Style: {
          fontSize: getDynamicValue(16),
        },
			})
			// Sentry.Native.captureMessage('Error caught from updating profile')
			// Sentry.Native.captureException(error)
		},
	})

	useEffect(() => {
		if (user) {
			setUsername(user.username)
		}
	}, [user])

	return (
		<View
			className='h-full w-full justify-center items-center'
			lightColor={light.background}
			darkColor={dark.background}
		>
			{/* <Spinner
				visible={isLoading}
				textContent={'Loading...'}
				textStyle={tw`text-lg`}
				cancelable={false}
			/> */}
			<UploadImage />
			<View
        className='flex flex-col h-1/12 w-11/12 p-2 border-b'
        style={{
				  borderColor: light.iconsColor,
			  }}
      >
				<MonoText
					className='text-sm text-left'
					lightColor={light.activeIconColor}
					darkColor={dark.activeIconColor}
				>Email</MonoText>
				<TextInput
					placeholder="Email"
					placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
          className='w-11/12 h-full text-lg text-left'
					style={{
						color: theme === 'light' ? light.tint : dark.tint,
					}}
					value={session?.user?.email}
					editable={false}
				/>
			</View>
			<View
        className='flex flex-col h-1/12 w-11/12 p-2 border-b'
				style={{
					borderColor: usernameFocused ? light.activeIconColor : light.iconsColor,
				}}>
				<MonoText
					className='text-sm text-left'
					lightColor={light.activeIconColor}
					darkColor={dark.activeIconColor}
				>Username</MonoText>
				<TextInput
					placeholder={'Username'}
					placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
					value={username || ''}
          className='w-11/12 h-full text-lg text-left'
					style={{
						color: theme === 'light' ? light.text : dark.text,
					}}
					onBlur={() => setUsernameFocused(false)}
					onFocus={() => setUsernameFocused(true)}
					onChangeText={(text) => setUsername(text)}
					editable={!loading}
				/>
			</View>
			
			<View className='h-1/12 w-6/12 m-8'>
				<Pressable
          className='p-2 rounded-full bg-transparent border'
					style={{
						borderColor: light.activeIconColor,
					}}
					onPress={() => updateProfileMutation.mutate()}
					disabled={loading}
				>
					<MonoText
						className='text-center text-lg p-1'
						lightColor={light.activeIconColor}  
						darkColor={dark.activeIconColor}
					>Update</MonoText>
				</Pressable>
			</View>

			<SignOutAndDelete />
		</View>
	)
}

export default settings