import React, { useEffect, useState } from 'react'
import { supabase } from '@utils/supabase'
import SettingHeader from '@components/headers/settingHeader'
import { Stack } from 'expo-router'

const App = () => {
	const [, setSession] = useState()

	useEffect(() => {
		supabase.auth.onAuthStateChange((_, session) => {
			console.log(session)
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