import React, { useState } from 'react'
import { Alert, Pressable, TextInput, useColorScheme } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { makeRedirectUri } from 'expo-auth-session'
import { supabase } from '@utils/supabase'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { MonoText, QuickSandText } from '@components/styled/StyledText'
import Toast from 'react-native-toast-message'
import tw from 'twrnc'

const redirectTo = makeRedirectUri()

const signin = () => {
	const theme = useColorScheme()
	const router = useRouter()
	const queryClient = useQueryClient()
	const[isEmailFocused, setIsEmailFocused] = useState(false)
	const [email, setEmail] = useState('')
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const signInWithEmailMutation = useMutation({
		mutationFn: async () => {
			await supabase.auth.signInWithPassword({ email, password })
		},
		onSuccess: () => {
			setLoading(false)
			queryClient.invalidateQueries({
				queryKey: ['session'],
			})
			Alert.alert(
				'Signed In!',
				'Your session.',
				[
					{
						text: 'Ok',
						onPress: () => router.push('/'),
						style: 'cancel',
					},
				],
			)
		},
		onError: (error) => {
			// Sentry.Native.captureMessage('Error returned from signing in')
			// Sentry.Native.captureException(error)
			setLoading(false)
			Alert.alert(error.message)
		},
	})

	const signUpWithEmailMutation = useMutation({
		mutationFn: () => supabase.auth.signUp({
			email,
			password,
			// options: {
			// 	emailRedirectTo: redirectTo
			// },
		}),
		onSuccess: () => {
			setLoading(false)
			Alert.alert('Check your email for email verification!')
		},
		onError: (error) => {
			// Sentry.Native.captureMessage('Error returned from signing up')
			// Sentry.Native.captureException(error)
			setLoading(false)
			Alert.alert(error.message)
		},
	})


	return (
		<View
			style={tw`'h-full w-full items-center justify-center`}
			lightColor={light.background}
			darkColor={dark.background}
		>
			<QuickSandText
				style={tw`'text-2xl text-center mb-8`}
				lightColor={light.activeIconColor}
				darkColor={dark.text}
			>Create Account or Sign In</QuickSandText>
			<TextInput
				style={[tw`w-10/12 h-14 text-lg text-left px-4 ${isEmailFocused ? 'border-b' : ''}`, {
					color: theme === 'light' ? light.text : dark.text,
					borderBottomColor: isEmailFocused ? light.activeIconColor : dark.activeIconColor,
				}]}
				onFocus={() => setIsEmailFocused(true)}
				onBlur={() => setIsEmailFocused(false)}
				onChangeText={(text) => setEmail(text)}
				value={email}
				placeholder="email@address.com"
				placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
				autoCapitalize={'none'}
			/>
			<TextInput
				style={[tw`w-10/12 h-14 text-lg text-left px-4 ${isPasswordFocused ? 'border-b' : ''}`, {
					color: theme === 'light' ? light.text : dark.text,
					borderBottomColor: isPasswordFocused ? light.activeIconColor : dark.activeIconColor,
				}]}
				onFocus={() => setIsPasswordFocused(true)}
				onBlur={() => setIsPasswordFocused(false)}
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
				placeholder="password"
				placeholderTextColor={theme === 'light' ? light.tint : dark.tint}
				autoCapitalize={'none'}
			/>
			<View style={tw`w-10/12 py-2`}>
				<Pressable
					disabled={loading}
					onPress={async () => {
						setLoading(true)
						const res = await supabase.auth.signInWithPassword({ email, password })
						console.log(res)
						if (res.data) {
							Toast.show({
								type: 'success',
								text1: 'Signed in',
								text2: 'You have successfully signed in',
							})
						} else {
							Toast.show({
								type: 'error',
								text1: 'Error',
								text2: 'There was an error signing in',
							})
						}
						setLoading(false)
					}}
					style={[tw`rounded-full w-full p-2 border`, {
						borderColor: theme === 'light' ? light.activeIconColor : dark.activeIconColor,
						backgroundColor: loading ? light.tint : 'transparent'
					}]}
				>
					<MonoText
						lightColor={light.activeIconColor}
						darkColor={dark.activeIconColor}
						style={tw`text-center text-lg`}
					>Sign in</MonoText>
				</Pressable>
			</View>
			<View style={tw`w-10/12 py-2`}>
				<Pressable
					disabled={loading}
					onPress={async () => {
						setLoading(true)
						const res = await supabase.auth.signUp({
							email,
							password,
							options: {
								emailRedirectTo: redirectTo
							}
						})
						console.log(res)
						if (res.data) {
							Toast.show({
								type: 'success',
								text1: 'Signed in',
								text2: 'You have successfully signed in',
							})
						} else {
							Toast.show({
								type: 'error',
								text1: 'Error',
								text2: 'There was an error signing in',
							})
						}
						setLoading(false)
					}}
					style={[tw`rounded-full w-full p-2 border`, {
						borderColor: theme === 'light' ? light.activeIconColor : dark.activeIconColor,
						backgroundColor: loading ? light.tint : 'transparent'
					}]}
				>
					<MonoText
						lightColor={light.activeIconColor}
						darkColor={dark.activeIconColor}
						style={tw`text-center text-lg`}
					>Sign up</MonoText>
				</Pressable>
			</View>
		</View>
	)
}

export default signin