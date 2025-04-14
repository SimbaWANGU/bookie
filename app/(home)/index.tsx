import React from 'react'
import { View, FlatList } from 'react-native'
import { useColorScheme } from 'react-native'
import tw from '@utils/tailwind'
import FeaturedBooks from '@components/PageComponents/home/FeaturedBooks'
import UserActivities from '@components/PageComponents/home/UserActivities'

const sections = [
  { key: 'featured', component: <FeaturedBooks /> },
  { key: 'endless_scroll', component: <UserActivities /> },
]

const Index = () => {
  const theme = useColorScheme()
  
  const renderItem = ({ item }) => (
    <View style={tw`mb-4`}>
      {item.component}
    </View>
  )

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <FlatList
        style={tw``}
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}

export default Index