// RootLayout.tsx
import 'react-native-url-polyfill/auto'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SplashScreen } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import 'react-native-reanimated'
import SpaceMono from '@fonts/SpaceMono-Regular.ttf'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { CustomUser } from '@models/userProfile.type'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import Main from '@components/Main/Main'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import { bookPreferencesAtom } from '@stores/preference.state'
import UserSubscription from 'src/subscriptions/UserSubscription'
import ToastManager from 'toastify-react-native'
// import * as Sentry from "@sentry/react-native";

// Sentry.init({
//   dsn: "https://71fef3f89c26060458a4f90e4f54c3a2@o4506275145908224.ingest.us.sentry.io/4506275154558976",
//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,
//   tracesSampleRate: 0.1,
// 	sampleRate: 0.1,
// 	debug: true
// });


configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true,
})

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const theme = useColorScheme()
  const [, setSession] = useAtom(userAtom)
  useAtom(firstTimeOnAppAtom)
  useAtom(bookPreferencesAtom)

  const [fontLoading, fontError] = useFonts({
    SpaceMono,
  })

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  })

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        // Fetch your custom user data using the auth user's id
        supabase.from('users').select('*').eq('id', session.user.id).single().then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          } else {
            setSession(data as CustomUser)
          }
        })
      }
    })

    // Optionally, you may want to cleanup the listener on unmount
    return () => authListener.subscription.unsubscribe()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <UserSubscription />
        <Main />
      </QueryClientProvider>
      <ToastManager />
    </GestureHandlerRootView>
  )
}

// Sentry.wrap(RootLayout)
export default RootLayout