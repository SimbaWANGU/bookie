import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import TabsIcons from '@components/icons/TabIcons'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import tw from '@utils/tailwind'
import { bookPreferencesAtom } from '@stores/preference.state'
import { Image } from 'expo-image'
import ContinueReading from '@components/PageComponents/home/ContinueReading'
import Header from '@components/headers/header'

export default function TabLayout() {
	const theme = useColorScheme()
	const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)
	const [user] = useAtom(userAtom)
  const [bookPreferences] = useAtom(bookPreferencesAtom)

	if (firstTimeOnApp) {
		return <Redirect href='/auth/onboard' />
	}

	if (!user) {
		return <Redirect href="/auth/authenticate" />;
	}

	if (bookPreferences.length === 0) {
		return <Redirect href='/auth/choose' />
	}

	return (
		<>
			<Tabs
				backBehavior="history"
				// initialRouteName='index'
				screenOptions={{
					tabBarStyle: {
						height: Platform.OS === 'ios' ? getDynamicValue(120) : getDynamicValue(100),
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: theme === 'dark' ? dark.background : light.background,
					},
					tabBarInactiveTintColor: theme === 'dark' ? dark.iconsColor : light.iconsColor,
					tabBarActiveTintColor: theme === 'dark' ? dark.activeIconColor : light.activeIconColor,
				}}
			>

				<Tabs.Screen
					name="index"
					options={{
						headerShown: true,
						header: () => <Header title='Home' />,
						tabBarIcon: ({ color, focused }) => <TabsIcons name="house" color={color} focused={focused} />,
						title: '',
						lazy: false,
						
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => <TabsIcons name="magnifying-glass" color={color} focused={focused}  />,
						title: '',
						lazy: false,
					}}
				/>

				<Tabs.Screen
					name="clubs"
					options={{
						headerShown: true,
						header: () => <Header title='Clubs' />,
						tabBarIcon: ({ color, focused }) => <TabsIcons name="people-group" color={color} focused={focused}  />,
						title: '',
						lazy: false,
					}}
				/>

				<Tabs.Screen
					name="profile"
					options={{
						headerShown: true,
						header: () => <Header title='Profile' />,
						tabBarIcon: ({ focused }) => <Image source={user.avatar_url} style={tw`mt-6 h-full border ${focused ? 'border-accent' : theme === 'light' ? 'border-dark' : 'border-light'} aspect-square rounded-full`} />,
						title: '',
						lazy: false
					}}
				/>

			</Tabs>	
			<ContinueReading />
		</>
	)
}
