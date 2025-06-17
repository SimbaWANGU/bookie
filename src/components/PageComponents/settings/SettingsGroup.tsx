import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'

const SettingsGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const theme = useColorScheme()

  return (  
    <View style={tw`mb-6 px-4`}>
      <Text style={tw`text-base font-semibold mb-2 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>{title}</Text>
      <View style={tw`${theme === 'light' ? 'bg-white' : 'bg-black'} rounded-xl p-4 shadow-md`}>
        {children}
      </View>
    </View>
)}

export default SettingsGroup