import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { SplashScreen, Stack } from 'expo-router'
import useSession from '@hooks/useSession'
import SettingHeader from '@components/headers/settingHeader'

const App = () => {
	const [, setSession] = useSession()

	useEffect(() => {
		supabase.auth.onAuthStateChange((_, session) => {
			setSession(session)
		})
	}, [])

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'(home)'}
				options={{ headerShown: false }}
				getId={() => String(Date.now()) }	
			/>
			<Stack.Screen
				name={'book'}
				options={{ headerShown: false }}
				getId={() => String(Date.now()) }	
			/>
			<Stack.Screen
				name={'auth'}
				options={{ headerShown: false }}
				getId={() => String(Date.now()) }
			/>
			<Stack.Screen
				name={'settings'}
				options={{
					headerShown: true,
					header: () => <SettingHeader />,
				}}
				getId={() => String(Date.now()) }
			/>
		</Stack>
	)
}

export default App