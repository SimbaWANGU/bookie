import React, { useState } from 'react'
import { View, SectionList, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'
import FeaturedBooks from '@components/PageComponents/home/FeaturedBooks'
import UserActivities from '@components/PageComponents/home/UserActivities'
import { QuickSandTextMedium } from '@components/styled/StyledText'
import BookLikes from '@components/PageComponents/home/BookLikes'
import BookReviews from '@components/PageComponents/home/BookReviews'

const Index = () => {
  const theme = useColorScheme()
  const [likesModalVisible, setLikesmodalVisibile] = useState(false)
  const [reveiewsModalVisible, setReviewsModalVisible] = useState(false)

  const sections = [
    {
      title: 'Featured Books',
      data: ['featured'],
      render: () => <FeaturedBooks />,
    },
    {
      title: 'My Feed',
      data: ['endless_scroll'],
      render: () => <UserActivities setLikedBookFeedVisible={setLikesmodalVisibile} setReviewedBookFeedVisible={setReviewsModalVisible} />,
    },
  ]

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
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
            <QuickSandTextMedium style={tw`text-lg font-bold android:my-4 ios:my-1 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
              {title}
            </QuickSandTextMedium>
        )}}
        ListFooterComponent={<View style={tw`ios:h-4 android:h-32`} />}
      />
      <BookLikes isVisible={likesModalVisible} setIsVisible={setLikesmodalVisibile} />
      <BookReviews isVisible={reveiewsModalVisible} setIsVisible={setReviewsModalVisible} />
    </View>
  )
}

export default Index