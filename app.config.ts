import 'dotenv/config'

export default {
  expo: {
    name: 'Book Worms',
    slug: 'book-worms',
    scheme: 'book-worms',
    version: '0.1.1',
    icon: './assets/images/bookworms-logo.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    runtimeVersion: '1.0.0',
    ios: {
      googleServicesFile: process.env.GOOGLE_SERVICES_IOS,
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: 'com.simberella.bookie',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID,
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/bookworms2048.png',
        backgroundColor: '#002B36'
      },
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
          photosPermission: 'Bookie accesses your photos to let you set your profile picture.'
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
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#002B36",
          image: './assets/images/bookworms-logo.png',
          imageWidth: 200,          
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    splash: {
      
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '8757d84a-3a37-4f3a-a3b4-87ce159a960a'
      },
    },
    owner: 'simbawangu'
  }
}