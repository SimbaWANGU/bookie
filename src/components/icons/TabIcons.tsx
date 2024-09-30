import { Platform } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { View } from '@components/styled/Themed'
import tw from 'twrnc'

interface TabsIconsProps {
	name: React.ComponentProps<typeof FontAwesome6>['name']
	color: string
	focused?: boolean
}

const TabsIcons: React.FC<TabsIconsProps> = ({ name, color, focused }) => {

	return (
		<View
			style={tw`h-full w-full ${Platform.OS === 'ios' ? focused ? 'mt-8' : 'mt-8' : 'mt-2'} flex flex-col bg-transparent text-center items-center justify-evenly`}
		>
			<FontAwesome6 size={20} name={name} color={color} />
		</View>
	)
}

export default TabsIcons