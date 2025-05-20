import React from 'react'
import { Stack } from 'expo-router'
import ProfileHeader from '@components/headers/profileHeader'

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
					header: () => <ProfileHeader />
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
