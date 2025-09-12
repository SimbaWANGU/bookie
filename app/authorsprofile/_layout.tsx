import Header from '@components/headers/header'
import { Stack } from 'expo-router'
import React from 'react'

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='[author]'
				options={{
					headerShown: true,
					header: () => <Header title='Author' />,
				}}
			/>
		</Stack>
	)
}
