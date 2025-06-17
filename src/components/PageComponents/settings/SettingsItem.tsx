import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'

const SettingsItem = ({ label, right, border }: { label: string; right?: React.ReactNode, border?: boolean }) => {
  const theme = useColorScheme()
  return (
    <View style={tw`flex-row justify-between items-center android:py-3 ios:py-2 ${border ? 'border-b' : ''} ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
      <Text style={tw`ios:text-sm android:text-base font-medium ${theme === 'light' ? 'text-dark/60' : 'text-light/60'}`}>{label}</Text>
      {right}
    </View>
  )
}

export default SettingsItem