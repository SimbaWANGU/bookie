import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { dark, light } from '@constants/Color'
import { getDynamicValue } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { Book } from '@models/book.type'
import { useQueryClient } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'

const StoryHeader = () => {
  const theme = useColorScheme()
  const { synopsis } = useLocalSearchParams()
  const queryClient = useQueryClient()
  const cachedBook = queryClient.getQueryData<Book>([QueryKeys.book, synopsis])

  return (
    <View
      style={[
        tw`w-full absolute flex-row items-center px-4 mt-6`, {
          height: getDynamicValue(120),
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
        }
      ]}
    >
      {/* Back button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw`p-4 mr-2`}
        onPress={() => router.back()}
      >
        <FontAwesomeSixIcons
          name="arrow-left"
          style={tw`text-xl`}
          color={theme === 'light' ? light.text : dark.text}
        />
      </TouchableOpacity>

      {/* Book cover */}
      {cachedBook?.cover_image_url && (
        <Image
          source={cachedBook.cover_image_url}
          style={tw`w-10 h-10 rounded-full mr-3`}
          contentFit="cover"
        />
      )}

      {/* Book title */}
      <QuickSandTextRegular
        numberOfLines={1}
        ellipsizeMode="tail"
        style={tw`text-sm flex-1 ${theme === 'light' ? 'text-dark' : 'text-light'}`}
      >
        {cachedBook?.title}
      </QuickSandTextRegular>
    </View>
  )
}

export default StoryHeader