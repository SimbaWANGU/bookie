import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import tw from '@utils/tailwind'
import { useQuery } from '@tanstack/react-query'
import { getCompletedBooksReadingStats } from '@api/profile/api.readingStats'
import { BookProgress } from '@models/completed.type'
import { convertToTime } from '@constants/Functions'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QuickSandText } from '@components/styled/StyledText'

const CompletedBookReadingTime = () => {
  const { data: progress, isLoading, error} = useQuery<BookProgress[]>({
    queryKey: ['completed_book_reading_time'],
    queryFn: getCompletedBooksReadingStats
  })
  // console.log(data, isLoading, error)

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
                <QuickSandText style={tw`text-xs text-accentlight`}>
                    {item.status}
                  </QuickSandText>
                </View>
              {/* Overlay for genres */}
              {/* <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
                {books.book_genres?.map((genre, idx) => (
                  <View
                    key={idx}
                    style={tw`px-2 py-1 rounded-full mr-1 mb-1 bg-accent/75`}
                  >
                    <QuickSandText style={tw`text-xs font-bold text-light`}>
                      {genre.genres.name}
                    </QuickSandText>
                  </View>
                ))}
              </View> */}
            </View>

            {/* Other book details */}
            <QuickSandText style={tw`text-xl font-bold mb-2`}>
              {item.books.title}
            </QuickSandText>
            {/* <QuickSandText style={tw`text-base my-2`} numberOfLines={4}>
              {books.description}
            </QuickSandText> */}
            <QuickSandText style={tw`text-xs text-gray-500`}>
              Time Taken: {convertToTime(item.total_time_spent ?? 100)}
            </QuickSandText>
        </View>)
      })
  }
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  coverImage: {
    width: 150,
    height: 220,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  readingTime: {
    fontSize: 16,
  },
});

export default CompletedBookReadingTime