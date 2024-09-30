import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Linking, useColorScheme } from 'react-native'
import { Link, SplashScreen, useNavigationContainerRef } from 'expo-router'
import { useSegments } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { ROUTES } from '@utils/constants'
import * as Updates from 'expo-updates'
import { StatusBar } from 'expo-status-bar'
import App from '@components/app/App'
import { dark, light } from '@constants/Color'
import { useFonts } from 'expo-font'
import 'react-native-reanimated'
import SpaceMono from '@fonts/SpaceMono-Regular.ttf'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as Sentry from '@sentry/react-native'
import useAsyncStorage from '@hooks/useAsyncStorage'

// import QuickSand from '@fonts/Quicksand_Bold.otf'

SplashScreen.preventAutoHideAsync()
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

// Sentry.init({
// 	dsn: "https://71fef3f89c26060458a4f90e4f54c3a2:da9eadab22517db8ca8037d87f0e057c@o4506275145908224.ingest.us.sentry.io/4506275154558976",
// 	tracesSampleRate: 1.0,
// 	debug: true,
// 	integrations: [
// 		new Sentry.ReactNativeTracing({
// 			routingInstrumentation,
// 		}),
// 	],
// })

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


const RootLayout = () => {
  const theme = useColorScheme()
  const ref = useNavigationContainerRef()
  const [, getAsyncStorageItem] = useAsyncStorage()
  // void getAsyncStorageItem('firstTimeOnApp')
  const [loaded, error] = useFonts({
		SpaceMono: SpaceMono,
		// QuickSand: QuickSand,
	})
  useReactQueryDevTools(client)
  
  useEffect(() => {
    void getAsyncStorageItem('firstTimeOnApp')
  }, [])
  
  useEffect(() => {
		if (ref) {
			routingInstrumentation.registerNavigationContainer(ref)
		}
	}, [ref])

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

  // const segments = useSegments()
  // const isLogin = segments[segments.length - 1] === '(tabs)'
  // const drawerTitle = isLogin ? 'LOGIN' : segments.length > 0 ? segments[segments.length - 1].toLowerCase() : ''

  // const runTypeMessage = Updates.isEmbeddedLaunch
  // ? 'This app is running from built-in code'
  // : 'This app is running an update'

  // console.log('runTypeMessage', runTypeMessage)

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={client}>
        <App />
        <StatusBar
          style="auto"
          backgroundColor={theme === 'light' ? light.background : dark.background}
          />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

Sentry.wrap(RootLayout)

export default RootLayout
