import tw from '@utils/tailwind'
import React from 'react'
import { Text, useColorScheme, View } from 'react-native'

type Props = {
  vertical: boolean
  current: number
  total: number
}

const PageIndicator = ({ vertical, current, total }: Props) => {
  const theme = useColorScheme()
  const textColor = theme === 'light' ? 'text-dark' : 'text-light'
  const bgColor = 'bg-transparent'

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