// RootLayout.tsx
import 'react-native-reanimated'
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import { SystemBars } from 'react-native-edge-to-edge'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import SpaceMonoRegular from '@fonts/SpaceMono-Regular.ttf'
import SpaceMonoBold from '@fonts/SpaceMono-Bold.ttf'
import SpaceMonoBolditalic from '@fonts/SpaceMono-BoldItalic.ttf'
import SpaceMonoItalic from '@fonts/SpaceMono-Italic.ttf'
import QuickSandRegular from '@fonts/Quicksand-Regular.ttf'
import QuickSandLight from '@fonts/Quicksand-Light.ttf'
import QuickSandMedium from '@fonts/Quicksand-Medium.ttf'
import QuickSandBold from '@fonts/Quicksand-Bold.ttf'
import QuickSandSemiBold from '@fonts/Quicksand-SemiBold.ttf'
import { useAtom } from 'jotai'
import Main from '@components/Main/Main'
import { firstTimeOnAppAtom } from '@stores/firstTimeonApp.state'
import { bookPreferencesAtom } from '@stores/preference.state'
import UserSubscription from 'src/subscriptions/UserSubscription'
import ToastManager from 'toastify-react-native'
import useAuthSessionSync from '@hooks/useAuthSessionSync'

SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  useAtom(firstTimeOnAppAtom)
  useAtom(bookPreferencesAtom)
  useAuthSessionSync()

  const [fontsLoaded, fontsError] = useFonts({
    SpaceMonoRegular,
    SpaceMonoBold,
    SpaceMonoBolditalic,
    SpaceMonoItalic,
    QuickSandRegular,
    QuickSandLight,
    QuickSandMedium,
    QuickSandBold,
    QuickSandSemiBold
  })
  
  const client = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 10,
        retry: 3
      },
    },
  }), [])

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hide()
    }
  }, [fontsLoaded, fontsError])

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={client}>
        <Main />
        <UserSubscription />
        <SystemBars
					style={{ statusBar: 'auto', navigationBar: 'auto' }}
				/>
      </QueryClientProvider>
      <ToastManager />
    </GestureHandlerRootView>
  )
}