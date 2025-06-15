import 'dotenv/config'

export default {
  expo: {
    name: 'book-worms',
    slug: 'book-worms',
    scheme: 'book-worms',
    version: '0.0.1',
    icon: './assets/images/bookworms-logo.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    runtimeVersion: '1.0.0',
    splash: {
      image: './assets/images/bookworms-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      googleServicesFile: './GoogleService-Info.plist',
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: 'com.simberella.bookie',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      googleServicesFile: './google-services.json',
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/bookworms-logo.png',
        backgroundColor: '#ffffff'
      },
      versionCode: 1,
      permissions: [
        'android.permission.RECORD_AUDIO',
        'android.permission.MODIFY_AUDIO_SETTINGS'
      ],
      package: 'com.simberella.bookie'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-secure-store',
      'expo-apple-authentication',
      'expo-asset',
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: true
          },
          android: {
            newArchEnabled: true
          }
        }
      ],
      [
        'expo-image-picker',
        {
          photosPermission:
            'Bookie accesses your photos to let you set your profile picture.'
        }
      ],
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: 'book-worms',
          organization: 'simbawangu',
          authToken: process.env.SENTRY_AUTH_TOKEN
        }
      ],
      'expo-audio',
      [
        'expo-notifications',
        {
          icon: './assets/images/bookworms-logo.png',
          defaultChannel: 'default',
          enableBackgroundRemoteNotifications: false
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '8757d84a-3a37-4f3a-a3b4-87ce159a960a'
      }
    },
    owner: 'simbawangu'
  }
}