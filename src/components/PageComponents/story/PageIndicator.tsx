import React from 'react'
import { View, Text, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'

type Props = {
  vertical: boolean
  current: number
  total: number
}

const PageIndicator = ({ vertical, current, total }: Props) => {
  const theme = useColorScheme()
  const textColor = theme === 'light' ? 'text-dark' : 'text-light'
  const bgColor = theme === 'light' ? 'bg-white/80' : 'bg-dark/80'

  if (!current || !total) {
    return <></>
  }

  if (vertical) {
    return (
      <View style={tw`absolute bottom-10 left-3 px-3 py-1 ${bgColor}`}>
        <Text style={[tw`text-xs ${textColor}`]}>
          {current} / {total}
        </Text>
      </View>
    )
  }

  return (
    <View style={tw`${bgColor}`}>
      <Text style={[tw`text-xs ${textColor}`]}>
        {current} / {total}
      </Text>
    </View>
  )
}

export default PageIndicator