import React from 'react'
import { View, SectionList, Text, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'
import FeaturedBooks from '@components/PageComponents/home/FeaturedBooks'
import UserActivities from '@components/PageComponents/home/UserActivities'
import ActivityFilter from '@components/PageComponents/home/ActivityFilter'

const sections = [
  {
    title: 'Featured Books',
    data: ['featured'],
    render: () => <FeaturedBooks />,
  },
  // Uncomment this if needed
  // {
  //   title: 'Filter',
  //   data: ['filter'],
  //   render: () => <ActivityFilter />,
  // },
  {
    title: 'My Feed',
    data: ['endless_scroll'],
    render: () => <UserActivities />,
  },
]

const Index = () => {
  const theme = useColorScheme()

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={tw`p-4 android:mt-32 ios:mt-24`}
        renderItem={({ section }) => (
          <View style={tw`mb-4`}>
            {section.render()}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => {
          if (title === 'Featured Books') {
            return <></>
          }
          return (
            <Text style={tw`text-lg font-bold android:my-4 ios:my-1 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
              {title}
            </Text>
        )}}
        ListFooterComponent={<View style={tw`ios:h-4 android:h-32`} />}
      />
    </View>
  )
}

export default Index