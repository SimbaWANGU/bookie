import React from 'react'
import { MonoText } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { light, dark } from '@constants/Color'
import { supabase } from '@utils/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pressable } from 'react-native'
import useUser from '@hooks/useUser'

const SignOutAndDelete = () => {
  const [user] = useUser()
	const queryClient = useQueryClient()
	const signOutMutation = useMutation({
		mutationFn: async () => {
			await supabase.auth.signOut()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['session'],
			})
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const deleteAccountMutation = useMutation({
		mutationFn: async () => {
			await supabase.from('profiles').delete().eq('id', user?.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['session'],
			})
		},
		onError: (error) => {
			console.log(error)
		}
	})

	return (
		<View className='absolute bottom-0 justify-evenly items-center flex flex-row h-1/12 w-12/12 m-8'>
			<Pressable
        className='p-2 w-5/12 rounded-lg bg-transparent'
				style={{
					backgroundColor: light.activeIconColor,
				}}
				onPress={() => signOutMutation.mutate()}
			>
				<MonoText
					className='text-center text-lg p-1'
					lightColor={dark.text}  
					darkColor={dark.text}
				>Sign Out</MonoText>
			</Pressable>

			<Pressable
				className='p-2 w-5/12 rounded-lg bg-red-500'
				onPress={() => {}}
			>
				<MonoText
					className='text-center text-lg p-1'
					lightColor={dark.text}  
					darkColor={dark.text}
				>Delete Account</MonoText>
			</Pressable>
		</View>
	)
}

export default SignOutAndDelete