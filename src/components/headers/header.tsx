import React from 'react'
import { Platform, Pressable, useColorScheme, View } from 'react-native'
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
import { useAtom } from 'jotai'
import { showCreateClubModalAtom } from '@stores/clubs.state'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const theme = useColorScheme()
  const height = getDynamicValue(140)
  const [, setShowCreateClubModal] = useAtom(showCreateClubModalAtom)


  // Conditionally use BlurView or View
  const Container = Platform.OS === 'android' ? View : BlurView

  return (
    <Container
      {...(Platform.OS !== 'android' && {
        intensity: 80,
        tint: theme === 'light' ? 'light' : 'dark',
      })}
      style={[
        tw`w-full px-4 pb-4 flex-row justify-between items-end`,
        {
          height,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: Platform.OS === 'android'
            ? theme === 'light'
              ? '#ffffffcc' // Light background with some transparency
              : '#000000cc' // Dark background with some transparency
            : undefined,
        },
      ]}
    >
      {title === 'Settings' || title === 'User Profile' ? (
        <Pressable onPress={() => router.back()} hitSlop={hitSlop}>
          <FontAwesomeSixIcons
            name="arrow-left"
            style={tw`text-xl aspect-square rounded-full h-5/12`}
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
      )}

      <QuickSandText style={tw`text-lg font-bold`}>
        {title === 'User Profile' ? 'Profile' : title}
      </QuickSandText>

      {title === 'Clubs' ? (
        <Pressable onPress={() => setShowCreateClubModal(true)} hitSlop={hitSlop}>
        <MaterialIcons
          name="add-circle"
          style={tw`${theme === 'light' ? 'text-dark' : 'text-light'} text-accent text-2xl`}
        />
      </Pressable>
      ) : (
        <Pressable onPress={() => router.push('/settings')} hitSlop={hitSlop}>
        <MaterialIcons
          name="settings"
          style={tw`${theme === 'light' ? 'text-dark' : 'text-light'} text-2xl`}
        />
      </Pressable>
      )}
    </Container>
  )
}

export default Header