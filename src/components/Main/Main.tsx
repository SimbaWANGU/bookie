import React, { useEffect, useRef } from 'react'
import { Slot, SplashScreen, router } from 'expo-router'
import { useAtom } from 'jotai'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import { fetchCustomUser } from '@api/profile/api.user'
import { QueryKeys } from '@constants/QueryKeys'
import { userAtom } from '@stores/user.state'
import { registerForPushNotificationsAsync } from '@hooks/usePushNotifications'
import { supabase } from '@utils/supabase'
import { CustomUser } from '@models/userProfile.type'
import ErrorBoundary from 'react-native-error-boundary'
import CustomFallBack from '@components/FallBack/CustomFallBack'

const Main = () => {
  const queryClient = useQueryClient()
  const [, setUser] = useAtom(userAtom)

  // 1) Fetch your custom user
  const { data, isLoading } = useQuery<CustomUser>({
    queryKey: [QueryKeys.getUser],
    queryFn: fetchCustomUser,
  })

  // 2) Mutation to update expo_push_token
  const addExpoPushTokenMutation = useMutation({
    mutationKey: ['updatePushToken'],
    mutationFn: async ({ user_id, expo_push_token }: { user_id: string, expo_push_token: string }) => {
      const { error } = await supabase.from('users').update({ expo_push_token }).eq('id', user_id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.getUser] })
    }
  })

  // 3) Once user data arrives, stash it in Jotaix
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  // 4) If user has no push token yet, register and send it
  useEffect(() => {
    if (data?.id && !data.expo_push_token) {
      registerForPushNotificationsAsync().then(async (token) => {
        if (token && token !== data.expo_push_token) {
          addExpoPushTokenMutation.mutate({ user_id: data.id, expo_push_token: token })
        }
      })
      .catch((error) => {
        console.warn('Push‐token registration failed:', error)
      })
    }
  }, [data?.id, data?.expo_push_token])

  // 5) Notification listeners (set up once)
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

  // 6) Hide splash exactly once when loading is done
  const hasHiddenRef = useRef(false)
  useEffect(() => {
    if (!isLoading && !hasHiddenRef.current) {
      SplashScreen.hideAsync().catch(console.warn)
      hasHiddenRef.current = true
    }
  }, [isLoading])

  // 7) While fetching, render nothing (splash remains)
  if (isLoading) {
    return null
  }

  // 8) Now that user & splash are settled, render your routes
  return (
    <ErrorBoundary FallbackComponent={CustomFallBack}>
      <Slot />
    </ErrorBoundary>
  )
}

export default Main