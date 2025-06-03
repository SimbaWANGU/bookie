import React from 'react'
import { Stack } from 'expo-router'
import Header from '@components/headers/header'

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='[user]'
				options={{
					headerShown: true,
					header: () => <Header title='Profile' />,
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
