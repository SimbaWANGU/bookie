import React from 'react'
import { View, TouchableOpacity, useColorScheme } from 'react-native'
import tw from '@utils/tailwind'
import { dark, light } from '@constants/Color'
import FontAwesomeSixIcons from '@components/icons/FontAwesomeSixIcons'
import { useAtom } from 'jotai'
import { pagerViewOrientationAtom } from '@stores/settings.state'
import { QueryKeys } from '@constants/QueryKeys'
import { useQueryClient } from '@tanstack/react-query'
import { Book } from '@models/book.type'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import PageIndicator from './PageIndicator'

type Props = {
  onNext: () => void
  onPrev: () => void
  currentPage: {
    paragraph_id: string;
    paragraph_no: number;
  }
}

const StoryNavigationButtons = ({ onNext, onPrev, currentPage }: Props) => {
  const theme = useColorScheme()
  const [pagerViewOrientation] = useAtom(pagerViewOrientationAtom)
  const textColor = theme === 'light' ? light.text : dark.text
  const bgColor = theme === 'light' ? 'bg-white/80' : 'bg-black/80'
  const { synopsis } = useGlobalSearchParams()
  const queryClient = useQueryClient()
  const cachedBook = queryClient.getQueryData<Book>([QueryKeys.book, synopsis])

  const totalPage = cachedBook?.story_paragraphs_count

  console.log(synopsis, totalPage![0].count)

  if ((pagerViewOrientation === 'vertical')) {
    return (
      <>
        <View style={tw`absolute right-4 bottom-10 items-center gap-4`}>
          <TouchableOpacity
            onPress={onPrev}
            activeOpacity={0.8}
            style={tw`aspect-square h-14 rounded-full items-center justify-center ${bgColor} shadow-md`}
          >
            <FontAwesomeSixIcons name="arrow-up" color={textColor} style={tw`text-base`} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            activeOpacity={0.8}
            style={tw`aspect-square h-14 rounded-full items-center justify-center ${bgColor} shadow-md`}
          >
            <FontAwesomeSixIcons name="arrow-down" color={textColor} style={tw`text-base`} />
          </TouchableOpacity>
        </View>

        <PageIndicator vertical={true} current={currentPage.paragraph_no} total={totalPage![0].count} />
      </>
    )
  }

  return (
    <View style={tw`absolute bottom-10 left-0 right-0 flex-row justify-between items-center px-6`}>
      <TouchableOpacity
        onPress={onPrev}
        activeOpacity={0.8}
        style={tw`flex-row aspect-square items-center justify-center h-14 rounded-full ${bgColor} shadow-md`}
      >
        <FontAwesomeSixIcons name="arrow-left" color={textColor} style={tw`text-base`} />
      </TouchableOpacity>

      <PageIndicator vertical={false} current={currentPage.paragraph_no} total={totalPage![0].count} />

      <TouchableOpacity
        onPress={onNext}
        activeOpacity={0.8}
        style={tw`flex-row aspect-square items-center justify-center h-14 rounded-full ${bgColor} shadow-md`}
      >
        <FontAwesomeSixIcons name="arrow-right" color={textColor} style={tw`text-base`}  />
      </TouchableOpacity>
    </View>
  )
}

export default StoryNavigationButtons