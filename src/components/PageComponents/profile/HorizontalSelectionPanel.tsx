import { View, TouchableOpacity, useColorScheme } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import tw from '@utils/tailwind'
import { MaterialCommunityIcons, Ionicons, FontAwesome} from '@expo/vector-icons'
import { getDynamicValue } from '@constants/Functions'

interface HorizontalSelectionPanelProps {
  selected: 'in progress' | 'completed' | 'liked' | 'reviews'
  setSelected: Dispatch<SetStateAction<'in progress' | 'completed' | 'liked' | 'reviews'>>
}

const HorizontalSelectionPanel: React.FC<HorizontalSelectionPanelProps> = ({ selected, setSelected }) => {
  const theme = useColorScheme()

  return (
    <View style={tw`flex flex-row w-full items-center justify-around py-2 w-11/12 mx-auto border-b border-gray-300`}>
      <TouchableOpacity onPress={() => setSelected('in progress')} style={tw`p-2`}>
        <MaterialCommunityIcons
          name="progress-clock"
          size={getDynamicValue(30)}
          style={tw`${selected === 'in progress' ? 'text-accent' : (theme === 'light' ? 'text-dark/80' : 'text-light/80')}`}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelected('liked')} style={tw`p-2`}>
        <Ionicons
          name={selected === 'liked' ? 'heart' : 'heart-outline'}
          size={getDynamicValue(30)}
          style={tw`${selected === 'liked' ? 'text-accent' : (theme === 'light' ? 'text-dark/80' : 'text-light/80')}`}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelected('reviews')} style={tw`p-2`}>
        <FontAwesome
          name={selected === 'reviews' ? 'comment' : 'comment-o'}
          size={getDynamicValue(30)}
          style={tw`${selected === 'reviews' ? 'text-accent' : (theme === 'light' ? 'text-dark/80' : 'text-light/80')}`}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelected('completed')} style={tw`p-2`}>
        <MaterialCommunityIcons
          name="progress-check"
          size={getDynamicValue(30)}
          style={tw`${selected === 'completed' ? 'text-accent' : (theme === 'light' ? 'text-dark/80' : 'text-light/80')}`}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HorizontalSelectionPanel