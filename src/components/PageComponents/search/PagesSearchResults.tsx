import { View, Text } from 'react-native'
import React from 'react'
import { Paragraph } from '@models/paragraph.type'

interface PagesSearchResultsProps {
  item: Paragraph[]
}

const PagesSearchResults: React.FC<PagesSearchResultsProps> = ({ }) => {
  return (
    <View>
      <Text>PagesSearchResults</Text>
    </View>
  )
}

export default PagesSearchResults