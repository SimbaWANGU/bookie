import React, { useState } from 'react'
import { View } from 'react-native'
import tw from '@utils/tailwind'
import HorizontalSelectionPanel from './HorizontalSelectionPanel'
import ContentArea from './ContentArea'

const SelectionPanel = () => {
  const [selected, setSelected] = useState< 'in progress' | 'completed' | 'liked' | 'reviews'>('in progress')

  return (
    <View style={tw`w-full bg-transparent`}>
      {/* Horizontal Selection Panel */}
      <HorizontalSelectionPanel selected={selected} setSelected={setSelected} />

      {/* Content Area */}
      <ContentArea selected={selected} />
    </View>
  );
};

export default SelectionPanel