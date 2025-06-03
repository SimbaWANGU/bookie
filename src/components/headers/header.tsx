import React from 'react'
import { Platform, Pressable, useColorScheme } from 'react-native'
import { getDynamicValue } from '@constants/Functions'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import tw from '@utils/tailwind'
import logo from '@images/bookworms-logo.png'
import { QuickSandText } from '@components/styled/StyledText'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { dark, light } from '@constants/Color'
import { hitSlop } from '@constants/HitSlop'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const theme = useColorScheme()
  const height = getDynamicValue(140)

  return (
    <BlurView
      intensity={Platform.OS === 'android' ? 90 : 80 }
      tint={theme === 'light' ? 'light' : 'dark'}
      style={[
        tw`w-full px-4 pb-4 flex-row justify-between items-end`,
        {
          height,
          position: 'absolute', // Ensures it overlays
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        },
      ]}
    >
      {title === 'Settings' ?
        (
          <Pressable onPress={() => router.back()} hitSlop={hitSlop}>
            <FontAwesomeSixIcons
              name="arrow-left"
              style={tw`text-xl`}
              color={theme === 'light' ? light.text : dark.text}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push('/')} hitSlop={hitSlop}>
            <Image
              source={logo}
              style={tw`aspect-square rounded-full h-5/12`}
              contentFit="contain"
            />
          </Pressable>
        )
      }
      <QuickSandText style={tw`text-lg font-bold`}>
        {title}
      </QuickSandText>
      {(title === 'Settings') ? 
      (<Pressable onPress={() => router.push('/settings')} hitSlop={hitSlop} >
        <MaterialIcons name="settings" style={tw`${theme !== 'light' ? 'text-dark' : 'text-light'} text-2xl`} />
      </Pressable>) :
      (<Pressable onPress={() => router.push('/settings')} hitSlop={hitSlop}>
        <MaterialIcons name="settings" style={tw`${theme === 'light' ? 'text-dark' : 'text-light'} text-2xl`} />
      </Pressable>)
      }
    </BlurView>
  )
}

export default Header