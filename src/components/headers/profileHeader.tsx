import React from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { router } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import tw from '@utils/tailwind'
import { View } from '@components/styled/Themed'

const ProfileHeader = () => {
  const theme = useColorScheme()

  return (
    <View style={tw`h-20 justify-end ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <TouchableOpacity
        style={tw`left-4`}
        onPress={() => router.back()}
      >
        <FontAwesome6 name={'arrow-left'} style={tw`android:text-3xl ios:text-2xl ${theme === 'light' ? 'text-dark' : 'text-light'}`} />
      </TouchableOpacity>
    </View>
  )
}

export default ProfileHeader