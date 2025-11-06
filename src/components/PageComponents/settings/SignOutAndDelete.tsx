import { SpaceMonoTextRegular } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import tw from '@utils/tailwind'
import React from 'react'
import { Pressable } from 'react-native'

const SignOutAndDelete = () => {
	// const signOutMutation = useMutation({
	// 	mutationFn: async () => {
	// 		await supabase.auth.signOut()
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['session'],
	// 		})
	// 	},
	// 	onError: (error) => {
	// 		Sentry.captureException(error)
	// 	}
	// })

	// const deleteAccountMutation = useMutation({
	// 	mutationFn: async () => {
	// 		await supabase.from('profiles').delete().eq('id', user?.id)
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['session'],
	// 		})
	// 	},
	// 	onError: (error) => {
	// 		Sentry.captureException(error)
	// 	}
	// })

	return (
		<View style={tw`absolute bottom-0 justify-evenly items-center flex flex-row h-1/12 w-12/12 m-8`}>
			<Pressable
        style={[tw`p-2 w-5/12 rounded-lg bg-transparent`, {
					backgroundColor: light.activeIconColor,
				}]}
				onPress={() => {}}
			>
				<SpaceMonoTextRegular
					style={tw`text-center text-lg p-1`}
					lightColor={dark.text}  
					darkColor={dark.text}
				>Sign Out</SpaceMonoTextRegular>
			</Pressable>

			<Pressable
				style={tw`p-2 w-5/12 rounded-lg bg-red-500`}
				onPress={() => {}}
			>
				<SpaceMonoTextRegular
					style={tw`text-center text-lg p-1`}
					lightColor={dark.text}  
					darkColor={dark.text}
				>Delete Account</SpaceMonoTextRegular>
			</Pressable>
		</View>
	)
}

export default SignOutAndDelete