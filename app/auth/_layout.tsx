import React from 'react'
import { Stack } from 'expo-router'
import SettingHeader from '@components/headers/settingHeader'

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
				getId={() => String(Date.now())}	
			/>
			<Stack.Screen
				name={'signin'}
				options={{
					headerShown: true,
					header: () => <SettingHeader />
				}}
				getId={() => String(Date.now())}	
			/>
		</Stack>
	)
}

export default _layout