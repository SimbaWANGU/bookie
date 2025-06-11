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
				name='[audio]'
				options={{
					headerShown: true,
					header: () => <SynopsisHeader />
				}}
				dangerouslySingular={() => String(Date.now())}	
			/>
		</Stack>
	)
}
