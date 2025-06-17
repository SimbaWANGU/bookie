import SettingHeader from '@components/headers/settingHeader'
import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='onboard'
				options={{
					headerShown: !true,
				}}
			/>
			<Stack.Screen
				name={'authenticate'}
				options={{
					headerShown: true,
					header: () => <SettingHeader />
				}}
			/>
			<Stack.Screen
				name={'choose'}
				options={{
					headerShown: false,
					// header: () => <SettingHeader />
				}}
			/>
		</Stack>
	)
}

export default _layout