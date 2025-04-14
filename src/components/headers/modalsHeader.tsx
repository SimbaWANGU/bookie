import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'
import { FontAwesome6 } from '@expo/vector-icons'

interface ReviewHeaderProps {
  setModalVisible: (arg0: boolean) => void
  title: string
}

const Reviewsheader: React.FC<ReviewHeaderProps> = ({ setModalVisible, title }) => {
  return (
    <View style={tw`flex flex-row items-center justify-start border-b border-gray-300 p-4 pt-6 bg-primary-color`}>
      <TouchableOpacity style={tw`p-2 h-10 mr-4`}
        onPress={() => setModalVisible(false)}>
        <FontAwesome6 name={'arrow-left'} style={tw`back-icon`} />
      </TouchableOpacity>
      <Text style={tw`text-2xl text-accent font-bold text-gray-800`}>{title}</Text>
    </View>
  )
}

export default Reviewsheader