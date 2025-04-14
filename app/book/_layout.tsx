import React from 'react'
import { Stack } from 'expo-router'
import SynopsisHeader from '@components/headers/synopsisHeader'
import StoryHeader from '@components/headers/storyHeader'

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
				getId={() => String(Date.now())}	
			/>
			<Stack.Screen
				name={'story'}
				options={{
					headerShown: true,
					header: () => <StoryHeader />
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
