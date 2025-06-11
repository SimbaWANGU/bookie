import StoryHeader from '@components/headers/storyHeader'
import SynopsisHeader from '@components/headers/synopsisHeader'
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
				name='[synopsis]'
				options={{
					headerShown: true,
					header: () => <SynopsisHeader />
				}}
			/>
			<Stack.Screen
				name={'story'}
				options={{
					headerShown: true,
					header: () => <StoryHeader />
				}}
			/>
		</Stack>
	)
}
