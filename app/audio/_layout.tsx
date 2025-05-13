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
				name='[audio]'
				options={{
					headerShown: true,
					header: () => <SynopsisHeader />
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}
