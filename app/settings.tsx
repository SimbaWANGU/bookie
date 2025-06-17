import React from 'react'
import { ScrollView, TouchableOpacity, View, useColorScheme, Text, Alert } from 'react-native'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { pagerViewOrientationAtom, textSizeAtom, timeFormatAtom } from '@stores/settings.state'
import { router } from 'expo-router'
import SettingsGroup from '@components/PageComponents/settings/SettingsGroup'
import SettingsItem from '@components/PageComponents/settings/SettingsItem'
import SettingsPicker from '@components/PageComponents/settings/SettingsPicker'
import SettingsSwitch from '@components/PageComponents/settings/SettingsSwitch'
import Header from '@components/headers/header'
import { userAtom } from '@stores/user.state'
import { supabase } from '@utils/supabase'

const SettingsScreen = () => {
  const theme = useColorScheme()
  const [is24Hour, setIs24Hour] = useAtom(timeFormatAtom)
  const [, setUser] = useAtom(userAtom)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Logout Failed', error.message)
    } else {
      setUser(null)
      router.replace('/auth/authenticate') 
    }
  }

  return (
    <ScrollView style={tw`flex-1 p-2 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <Header title='Settings' />
      <View style={tw`android:mt-32 ios:mt-24`} />
      <SettingsGroup title="Reading Preferences">
        <SettingsItem
          label="Text Size"
          right={
            <SettingsPicker
              atom={textSizeAtom}
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
            />
          }
          border
        />

        <SettingsItem
          label="Scroll Mode"
          right={
            <SettingsPicker
              atom={pagerViewOrientationAtom}
              options={[
                { label: 'Swipe', value: 'horizontal' },
                { label: 'Scroll', value: 'vertical' },
              ]}
            />
          }
        />
      </SettingsGroup>

      <SettingsGroup title="Time Display">
        <SettingsItem
          label="24-Hour Time Format"
          right={<SettingsSwitch value={is24Hour} onChange={setIs24Hour} />}
        />
      </SettingsGroup>

      <SettingsGroup title="Preferences">
        <TouchableOpacity
          style={tw`flex-row justify-between items-center android:py-3 ios:py-2 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
          onPress={() => router.push('/auth/choose')}
        >
          <Text style={tw`ios:text-sm android:text-base font-medium ${theme === 'light' ? 'text-dark/80' : 'text-light/80'}`}>
            {'Genre Select'}
          </Text>
        </TouchableOpacity>
      </SettingsGroup>

      <SettingsGroup title="Account">
        <TouchableOpacity
          style={tw`flex-row justify-between items-center android:py-3 ios:py-2 ${theme === 'light' ? 'border-red-300' : 'border-red-600'}`}
          onPress={handleLogout}
        >
          <Text style={tw`ios:text-sm android:text-base font-semibold text-red-500`}>
            Logout
          </Text>
        </TouchableOpacity>
      </SettingsGroup>
    </ScrollView>
  )
}

export default SettingsScreen