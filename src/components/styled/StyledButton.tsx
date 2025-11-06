import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons';
import { dark, light } from '@constants/Color';
import tw from '@utils/tailwind';
import { router } from 'expo-router';
import React from 'react'
import { PressableProps, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { QuickSandTextRegular, QuickSandTextSemiBold } from './StyledText';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void
  title?: string;
}

const Button = ({ onPress, title = 'Button' }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[tw`flex flex-row py-4 mt-8 px-4 items-center justify-between w-7/12 rounded-full`, {
        backgroundColor: dark.text
      }]}
      activeOpacity={.8}
      onPress={onPress}
    >
      <QuickSandTextSemiBold
        style={[tw`text-base`, {
          color: light.activeIconColor
        }]}
      >{title}</QuickSandTextSemiBold>
      <FontAwesomeSixIcons name="arrow-right" color={light.activeIconColor} />
    </TouchableOpacity>
  )
}

export default Button
