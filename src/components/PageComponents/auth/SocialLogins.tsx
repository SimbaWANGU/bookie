import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { Ionicons } from '@expo/vector-icons'

const SocialLogins = () => {
  return (
    <View style={tw`flex-row justify-center mb-4`}>
      <TouchableOpacity
        style={tw`p-3 mx-2 border border-gray-300 rounded-full`}
      >
        <Ionicons name="logo-google" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`p-3 mx-2 border border-gray-300 rounded-full`}
      >
        <Ionicons name="logo-apple" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default SocialLogins