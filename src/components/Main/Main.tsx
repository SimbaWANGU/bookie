import React, { useEffect, useState } from 'react'
import { Slot, SplashScreen, router } from 'expo-router'
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
  const [user, setSession] = useAtom(userAtom)
  const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined)

  const { data, isLoading } = useQuery<CustomUser>({
    queryKey: [QueryKeys.getUser],
    queryFn: fetchCustomUser,
  })

  // Set the session when data is available
  useEffect(() => {
    if (data) {
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

    const responseListener = Notifications.addNotificationResponseReceivedListener(notification => {
      switch (notification.notification.request.content.data.type) {
        case 'usersprofile':
          router.push(`/usersprofile/${notification.notification.request.content.data.user_id}`)

        case 'club_invite':
          queryClient.invalidateQueries({ queryKey: [QueryKeys.myClubs] })
          router.push(`/clubs`)

        default:
          return
      }
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