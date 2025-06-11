import React, { useEffect } from 'react'
import { Slot, SplashScreen, router } from 'expo-router'
import { CustomUser } from '@models/userProfile.type'
import { userAtom } from '@stores/user.state'
import { useAtom } from 'jotai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCustomUser } from '@api/profile/api.user'
import { QueryKeys } from '@constants/QueryKeys'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import * as Notifications from 'expo-notifications'
import { registerForPushNotificationsAsync } from '@hooks/usePushNotifications'
import { supabase } from '@utils/supabase'

const Main = () => {
  const queryClient = useQueryClient()
  const [, setUser] = useAtom(userAtom)
  const [firstTimeOnApp] = useAtom(firstTimeOnAppAtom)

  const { data, isLoading } = useQuery<CustomUser>({
    queryKey: [QueryKeys.getUser],
    queryFn: fetchCustomUser,
  })

  // Set the session when data is available
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, isLoading, firstTimeOnApp])

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  const addExpoPushTokenMutation = useMutation({
    mutationKey: ['updatePushToken'],
    mutationFn: async ({ user_id, expo_push_token }: { user_id: string, expo_push_token: string }) => {
      const { error } = await supabase.from('users').update({ expo_push_token }).eq('id', user_id)

      if (error) {
        throw new Error(error.message)
      }
    }
  })

  // Register push token only if missing or different
  useEffect(() => {
    if (data?.id && !data.expo_push_token) {
      registerForPushNotificationsAsync().then(async (token) => {
        if (token && token !== data.expo_push_token) {
          addExpoPushTokenMutation.mutate({ user_id: data.id, expo_push_token: token })
          queryClient.invalidateQueries({ queryKey: [QueryKeys.getUser] })
        }
      })
      .catch((error) => {
        throw new Error(error.message)
      })
    }
  }, [data?.id, data?.expo_push_token])

  // Notification listeners — only set once
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(() => null)
    const responseListener = Notifications.addNotificationResponseReceivedListener(notification => {
      switch (notification.notification.request.content.data.type) {
        case 'usersprofile':
          router.push(`/usersprofile/${notification.notification.request.content.data.user_id}`)
          break

        case 'club_invite':
          queryClient.invalidateQueries({ queryKey: [QueryKeys.myClubs] })
          router.push(`/clubs`)
          break

        default:
          return
      }
    })

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [])

  if (isLoading) {
    return null
  }

  // ✅ Authenticated user
  return <Slot />
}

export default Main