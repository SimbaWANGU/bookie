import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import tw from '@utils/tailwind'

const SettingsMultiSelect = ({selected, options, toggle }: {
  selected: string[]
  options: string[]
  toggle: (val: string) => void
}) => (
  <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
    {options.map(opt => (
      <TouchableOpacity
        key={opt}
        style={tw`${selected.includes(opt) ? 'bg-blue-600' : 'bg-gray-300'} px-3 py-1 rounded-full`}
        onPress={() => toggle(opt)}
      >
        <Text style={tw`${selected.includes(opt) ? 'text-white' : 'text-black'} text-xs`}>
          {opt}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)

export default SettingsMultiSelect