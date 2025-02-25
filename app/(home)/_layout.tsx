import React, { useEffect } from 'react'
import { Redirect, Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import Header from '@components/headers/header'
import ProfileHeader from '@components/headers/profileHeader'
import { userProfile } from '@models/userProfile.type'
import { getDynamicValue } from '@constants/Functions'
import TabsIcons from '@components/icons/TabIcons'
import useFirstTimeOnApp from '@hooks/useFirstTimeOnApp'

export default function TabLayout() {
	const theme = useColorScheme()
	const [firstTimeOnApp] = useFirstTimeOnApp()

	return <Redirect href="/auth/onboard" />
	// if (firstTimeOnApp) {
	// }

	// const { isLoading, data, error } = useQuery({
	// 	queryKey: [`user-${session?.user.id}`],
	// 	queryFn: async () => {
	// 		const { data, error } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single()
	// 		if (error) {
	// 			// Sentry.Native.captureMessage('Error catched from get user profile')
	// 			// Sentry.Native.captureException(error)
	// 			return {} as userProfile
	// 		}
	// 		return data as userProfile
	// 	}
	// })

	// useEffect(() => {
	// 	if (data) setUser(data)
	// 	const fetchProfilePicture = async () => {  
	// 		const blob = await supabase.storage.from('avatars').download(`${session?.user?.id}/pp`)
	// 		const fr = new FileReader()
	// 		if (blob.data){
	// 			fr.readAsDataURL(blob.data!)
	// 			fr.onload = () => {
	// 				setProfilePicture(fr.result as string)
	// 			}	
	// 		}
	// 	}

	// 	fetchProfilePicture()
	// }, [isLoading, error])

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					height: getDynamicValue(100),
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: theme === 'dark' ? dark.background : light.background,
				},
				tabBarInactiveTintColor: theme === 'dark' ? dark.iconsColor : light.iconsColor,
				tabBarActiveTintColor: theme === 'dark' ? dark.activeIconColor : light.activeIconColor,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: true,
					header: () => (
						<Header
							username={'username'}
							avatarUrl={'https://ui-avatars.com/api/?name=U+N'}
						/>
					),
					tabBarIcon: ({ color }) => <TabsIcons name="house" color={color} />,
					title: ''
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					headerShown: true,
					header: () => (
						<Header
							username={'username'}
							avatarUrl={'https://ui-avatars.com/api/?name=U+N'}
						/>
					),
					tabBarIcon: ({ color }) => <TabsIcons name="magnifying-glass" color={color} />,
					title: ''
				}}
			/>
			
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: true,
					header: () => <ProfileHeader />,
					tabBarIcon: ({ color }) => <TabsIcons name="user" color={color} />,
					title: ''
				}}
			/>
		</Tabs>
	)
}
