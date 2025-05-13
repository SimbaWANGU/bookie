import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { Ionicons } from '@expo/vector-icons'

const Audio = () => {
  const theme = useColorScheme()

  return (
    <View
      style={tw`absolute mt-2 top-2 right-2 flex-row items-center bg-accent/90 px-2 py-1 rounded-full`}
    >
      <Ionicons
        name="volume-high-outline"
        size={14}
        color={theme === 'light' ? '#333' : '#ddd'}
      />
      <Text
        style={tw`ml-1 text-xs ${
          theme === 'light' ? 'text-dark' : 'text-light'
        }`}
      >
        Audio
      </Text>
    </View>
  )
}

export default Audio