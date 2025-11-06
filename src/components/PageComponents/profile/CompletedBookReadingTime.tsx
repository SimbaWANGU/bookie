import { getCompletedBooksReadingStats } from '@api/profile/api.readingStats'
import { QuickSandTextRegular } from '@components/styled/StyledText'
import { convertToTime } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BookProgress } from '@models/completed.type'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

const CompletedBookReadingTime = () => {
  const { data: progress } = useQuery<BookProgress[]>({
    queryKey: [QueryKeys.completedBookReadingTime],
    queryFn: getCompletedBooksReadingStats
  })

  // ? convert these too:
  // ? 1. total read by genre
  // ? 2. Total read by author

  if (!progress) {
    return null
  }

  const newProgress = [...progress, ...progress]

  return (
    <>
    {
      newProgress.map((item, index) => {
        return (
        <View key={index} style={tw`bg-white/90 p-4 rounded-lg shadow mb-4`}>
            {/* Container with relative positioning to overlay content */}
            <View style={tw`overflow-hidden rounded-lg mb-4 relative`}>
              <Image
                source={{ uri: item.books.cover_image_url }}
                style={tw`w-full h-50`}
              />
              {/* Current paragraph badge at top right */}
              <View style={tw`absolute top-2 right-2 bg-green-500 bg-opacity-75 px-2 py-1 rounded-full flex-row items-center`}>
                <MaterialCommunityIcons name="progress-check" style={tw`mx-1 text-base`} />
                <QuickSandTextRegular style={tw`text-xs text-accentlight`}>
                    {item.status}
                  </QuickSandTextRegular>
                </View>
              {/* Overlay for genres */}
              {/* <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
                {books.book_genres?.map((genre, idx) => (
                  <View
                    key={idx}
                    style={tw`px-2 py-1 rounded-full mr-1 mb-1 bg-accent/75`}
                  >
                    <QuickSandTextRegular style={tw`text-xs font-bold text-light`}>
                      {genre.genres.name}
                    </QuickSandTextRegular>
                  </View>
                ))}
              </View> */}
            </View>

            {/* Other book details */}
            <QuickSandTextRegular style={tw`text-xl font-bold mb-2`}>
              {item.books.title}
            </QuickSandTextRegular>
            {/* <QuickSandTextRegular style={tw`text-base my-2`} numberOfLines={4}>
              {books.description}
            </QuickSandTextRegular> */}
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              Time Taken: {convertToTime(item.total_time_spent ?? 100)}
            </QuickSandTextRegular>
        </View>)
      })
  }
  </>
  )
}

export default CompletedBookReadingTime