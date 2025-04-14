import React from 'react'
import { Stack } from 'expo-router'
import UsersProfileHeader from '@components/headers/usersProfileHeader'

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
					header: () => <UsersProfileHeader />
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
