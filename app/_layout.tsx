import { useColorScheme } from 'react-native'
import { SplashScreen } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { StatusBar } from 'expo-status-bar'
import App from '@components/App/App'
import { useFonts } from 'expo-font'
import 'react-native-reanimated'
import SpaceMono from '@fonts/SpaceMono-Regular.ttf'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as Sentry from '@sentry/react-native'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { userAtom } from '@stores/user.state'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'
import { User } from '@supabase/supabase-js'
import { convertTime } from '@constants/Functions'
import { CustomUser } from '@models/userProfile.type'

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

// import QuickSand from '@fonts/Quicksand_Bold.otf'

SplashScreen.preventAutoHideAsync()

// Sentry.init({
// 	dsn: "https://71fef3f89c26060458a4f90e4f54c3a2:da9eadab22517db8ca8037d87f0e057c@o4506275145908224.ingest.us.sentry.io/4506275154558976",
// 	tracesSampleRate: 1.0,
// 	debug: true,
// })



const RootLayout = () => {
  const theme = useColorScheme()
  const [loaded, error] = useFonts({
    SpaceMono: SpaceMono,
		// QuickSand: QuickSand,
	})

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      mutations: {
        onError: (error) => {
          if ('message' in error) {
            console.error(error.message)
          }
        }
      }
    },
  })
  
  useReactQueryDevTools(client)
  
  // useEffect(() => {
	// 	if (ref) {
	// 		routingInstrumentation.registerNavigationContainer(ref)
	// 	}
	// }, [ref])

  useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	// useEffect for error handling
	useEffect(() => {
		if (error) {
			Sentry.captureException(error)
			SplashScreen.hideAsync()
		}
	}, [error])

  const [, setSession] = useAtom(userAtom)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        // Fetch your custom user data using the auth user's id
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching custom user data:', error);
            } else {
              setSession(data as CustomUser)
            }
          });
      }
    })

    // Optionally, you may want to cleanup the listener on unmount
    return () => authListener.subscription.unsubscribe()
  }, [])

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={client}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <App />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

Sentry.wrap(RootLayout)

export default RootLayout
