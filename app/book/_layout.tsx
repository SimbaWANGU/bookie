import React from 'react'
import { Redirect, Stack } from 'expo-router'
import useSession from '@hooks/useSession'
import Header from '@components/headers/header'
import SettingHeader from '@components/headers/settingHeader'
import SynopsisHeader from '@components/headers/synopsisHeader'

export default function TabLayout() {
	const [session] = useSession()
	
	// if (!session) {
	// 	return <Redirect href="/auth/signin" />
	// }
	
	// const { data } = useQuery({
	// 	queryKey: [`user-${session?.user.id}`],
	// 	queryFn: async () => {
	// 		try {
	// 			const { data, error, status } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single()
	// 			if (error && status !== 406) { 
	// 				Sentry.Native.captureMessage('Error returned from fetching profile, status code: ' + status)
	// 				Sentry.Native.captureException(error)
	// 				return {} as UserProfile
	// 			}
	// 			if (data)	return data as UserProfile
	// 		} catch (error) {
	// 			Sentry.Native.captureMessage('Error catched from get user profile')
	// 			Sentry.Native.captureException(error)
	// 			return {} as UserProfile
	// 		}
	// 	}
	// })
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='[synopsis]'
				options={{
					headerShown: !true,
				}}
				getId={() => String(Date.now())}	
			/>
			<Stack.Screen
				name={'story'}
				options={{
					headerShown: !true,
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
