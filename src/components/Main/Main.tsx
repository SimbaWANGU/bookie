import React, { useEffect, useState } from 'react'
import { Slot, SplashScreen } from 'expo-router'
import { CustomUser } from '@models/userProfile.type'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCustomUser } from '@api/profile/api.user'
import { QueryKeys } from '@constants/QueryKeys'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import * as Notifications from 'expo-notifications'
import { registerForPushNotificationsAsync } from '@hooks/usePushNotifications'

const Main = () => {
  const queryClient = useQueryClient()
  const [, setSession] = useAtom(userAtom)
  const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined)

  const { data, isLoading } = useQuery<CustomUser>({
    queryKey: [QueryKeys.getUser],
    queryFn: fetchCustomUser,
  })

  console.log(data, isLoading)

  // Set the session when data is available
  useEffect(() => {
    if (data) {
      console.log('main: ', data)
      setSession(data)
    }
  }, [data, isLoading, firstTimeOnApp])

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

	
  // notification setup
	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? '')).catch((error) => setExpoPushToken(`${error}`));
		const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

		return () => {
			notificationListener.remove()
			responseListener.remove()
		}
	}, [])


  if (isLoading) {
    return null
  }
  // ✅ Authenticated user
  return (
    <Slot />
  )
}

export default Main