import React from 'react'
import { Tabs } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'
import { light, dark } from '@constants/Color'
import Header from '@components/headers/header'
import ProfileHeader from '@components/headers/profileHeader'
import { getDynamicValue } from '@constants/Functions'
import TabsIcons from '@components/icons/TabIcons'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import Onboard from 'app/auth/onboard'
import AuthScreen from 'app/auth/authenticate'
import ContinueReading from '@components/PageComponents/home/ContinueReading'
import tw from '@utils/tailwind'

export default function TabLayout() {
	const theme = useColorScheme()
	const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)
	const [user] = useAtom(userAtom)

	return (
		<>
			{(() => {
        if (!firstTimeOnApp && !user) {
          return (
						<>
							<Onboard />
						</>
					)
        } else if (firstTimeOnApp && !user) {
					return (
						<>
							<AuthScreen />
						</>
					)
        } else {
          return (
						(
							<>
								<Tabs
									screenOptions={{
										tabBarStyle: {
											height: Platform.OS === 'ios' ? getDynamicValue(120) : getDynamicValue(100),
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
													username={user?.name as string}
													avatarUrl={user?.avatar_url as string}
												/>
											),
											tabBarIcon: ({ color }) => <TabsIcons name="house" color={color} />,
											title: '',
											lazy: false
										}}
									/>
					
									<Tabs.Screen
										name="search"
										options={{
											headerShown: true,
											header: () => (
												<Header
													username={user?.name as string}
													avatarUrl={user?.avatar_url as string}
												/>
											),
											tabBarIcon: ({ color }) => <TabsIcons name="magnifying-glass" color={color} />,
											title: '',
											lazy: false,
										}}
									/>
									
									<Tabs.Screen
										name="profile"
										options={{
											headerShown: true,
											headerStyle: {...tw`z-0`},
											header: () => <ProfileHeader />,
											tabBarIcon: ({ color }) => <TabsIcons name="user" color={color} />,
											title: '',
											lazy: false
										}}
									/>
								</Tabs>
								<ContinueReading />
							</>
						)
					)
        }
      })()}
		</>
	)
}
