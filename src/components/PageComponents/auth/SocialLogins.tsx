import React from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { supabase } from '@utils/supabase'
import { CustomUser } from '@models/userProfile.type'
import tw from '@utils/tailwind'
import { router } from 'expo-router'

// ✅ Configure Google Sign-In ONCE outside the component
GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
  ],
  webClientId: '146168556921-adcpklmv2se434h6blc92ni5jamo5uvf.apps.googleusercontent.com',
  offlineAccess: true
})

const SocialLogins = () => {
  const [, setUser] = useAtom(userAtom)

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      if (!userInfo.data?.idToken) {
        Alert.alert('Error', 'Missing Google ID token.')
        return
      }

      const { data, error: authError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      })

      if (authError) {
        Alert.alert('Error', 'Authentication failed.')
        throw new Error(authError.message)
      }

      if (data.user?.id) {
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (fetchError) {
          Alert.alert('Error', 'Failed to fetch user profile.')
          throw new Error(fetchError.message)
        } else {
          setUser(userData as CustomUser)
          router.push('/auth/choose')
        }
      }

    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // User cancelled
          break
        case statusCodes.IN_PROGRESS:
          Alert.alert('Info', 'Google sign-in is already in progress.')
          break
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert('Error', 'Google Play Services not available or outdated.')
          break
        default:
          console.error('Google Sign-In Error:', error)
          Alert.alert('Error', 'Something went wrong during sign-in.')
      }
    }
  }

  return (
    <View style={tw`flex-row justify-center mb-4`}>
      <TouchableOpacity
        style={tw`p-3 mx-2 border border-gray-300 rounded-full`}
        onPress={googleSignIn}
      >
        <Ionicons name="logo-google" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`p-3 mx-2 border border-gray-300 rounded-full`}
        onPress={() => Alert.alert('Info', 'Apple login coming soon!')}
      >
        <Ionicons name="logo-apple" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default SocialLogins