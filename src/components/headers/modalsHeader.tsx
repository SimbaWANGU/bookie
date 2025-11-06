import { View, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { FontAwesome6 } from '@expo/vector-icons'
import { hitSlop } from '@constants/HitSlop'
import { QuickSandTextSemiBold } from '@components/styled/StyledText'

interface ReviewHeaderProps {
  setModalVisible: (arg0: boolean) => void
  title: string
}

const ModalsHeader: React.FC<ReviewHeaderProps> = ({ setModalVisible, title }) => {
  const theme = useColorScheme()
  const isLight = theme === 'light'

  return (
    <View style={tw`flex-row items-center border-b border-gray-300 px-4 pt-10 pb-4 ${isLight ? 'bg-light' : 'bg-dark'}`}>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        hitSlop={hitSlop}
        style={tw`mr-4`}
      >
        <FontAwesome6
          name="arrow-left"
          size={20}
          color={isLight ? '#000' : '#fff'}
        />
      </TouchableOpacity>
      <QuickSandTextSemiBold style={tw`text-xl font-semibold ${isLight ? 'text-dark' : 'text-light'}`}>
        {title}
      </QuickSandTextSemiBold>
    </View>
  )
}

export default ModalsHeader