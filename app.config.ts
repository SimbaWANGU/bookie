export default {
  expo: {
    name: 'Book Worms',
    slug: 'book-worms',
    scheme: 'book-worms',
    version: '0.1.2',
    icon: './assets/images/app_icon.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    runtimeVersion: '1.0.0',
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      googleServicesFile: "./GoogleService-Info.plist",
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: 'com.simberella.bookie',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      googleServicesFile: "./google-services.json",
      softwareKeyboardLayoutMode: 'pan',
      edgeToEdgeEnabled: true,
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
    plugins: [
      'expo-router',
      'expo-font',
      'expo-secure-store',
      'expo-apple-authentication',
      '@react-native-google-signin/google-signin',
      'expo-asset',
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 27
          },
          ios: {
            useFrameworks: 'static'
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
          resizeMode: 'contain'      
        }
      ],
      'react-native-edge-to-edge'
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: '8757d84a-3a37-4f3a-a3b4-87ce159a960a'
      },
    },
    owner: 'simbawangu'
  }
}