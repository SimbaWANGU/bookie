import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { View } from '@components/styled/Themed'
import tw from '@utils/tailwind'

interface TabsIconsProps {
	name: React.ComponentProps<typeof FontAwesome6>['name']
	color: string
	focused?: boolean
}

const TabsIcons: React.FC<TabsIconsProps> = ({ name, color, focused }) => {

	return (
		<View
			style={tw`h-full w-full bg-transparent items-center justify-center mt-6`}
		>
			<FontAwesome6 size={focused ? 22 : 20} name={name} color={color} />
		</View>
	)
}

export default TabsIcons