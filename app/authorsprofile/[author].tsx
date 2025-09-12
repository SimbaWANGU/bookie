import { View, Text, useColorScheme, SectionList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import LeadAuthorProfileSection from '@components/PageComponents/author/LeadAuthorProfileSection'
import tw from '@utils/tailwind'
import Names from '@components/PageComponents/author/Names'
import Bio from '@components/PageComponents/author/Bio'
import { QueryKeys } from '@constants/QueryKeys'
import { useQuery } from '@tanstack/react-query'
import { fetchAuthor } from '@api/profile/api.author'
import AuthorContent from '@components/PageComponents/author/AuthorContent'

const Author = () => {
  const theme = useColorScheme()

  const sections = [
    {
      title: 'header',
      data: ['header'],
      renderItem: () => (
        <LeadAuthorProfileSection />
      )
    },
    {
			title: 'details',
			data: ['details'],
			renderItem: () => (
				<View style={tw`px-4 bg-transparent`}>
					<Names />
					<Bio />
				</View>
			),
    },
    {
      title: 'content',
      data: ['content'],
			renderItem: () => (
				<AuthorContent />
			),
		},
  ]

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SectionList
				sections={sections}
				keyExtractor={(item, index) => item + index}
				renderItem={({ section }) => section.renderItem()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={tw`android:mt-32 ios:mt-24`}
				stickySectionHeadersEnabled={false}
			/>
    </View>
  )
}

export default Author