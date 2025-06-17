import { View, ActivityIndicator, useColorScheme } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { Image } from 'expo-image'
import { convertTime } from '@constants/Functions'
import { fetchBooksInProgress } from '@api/profile/api.user'
import Foundation from '@expo/vector-icons/Foundation'
import { QueryKeys } from '@constants/QueryKeys'
import Genre from '@components/styled/Genre'
import { light } from '@constants/Color'
import { timeFormatAtom } from '@stores/settings.state'

interface InProgressBooksProps {
  id?: string
}

const InProgressBooks: React.FC<InProgressBooksProps> = ({ id }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)
  const [is24Hr] = useAtom(timeFormatAtom)
  
  const { data: inprogressbooks, isLoading, error } = useQuery<BookActivity[]>({
    queryKey: [QueryKeys.inProgressBooks, id ?? user?.id],
    queryFn: async () => await fetchBooksInProgress(id ?? user?.id as string, 'UPDATED')
  })

  if (isLoading) {
    return (
      <ActivityIndicator size='large' />
    )
  }

  if (error || !inprogressbooks) {
    return (
      <></>
    )
  }

  if (inprogressbooks.length === 0) {
    return (
      <View style={tw``}>
        <QuickSandText style={tw`text-base text-gray-400`}>
          Opened books will appear here
        </QuickSandText>
      </View>
    )
  }

  return (
    <View>
      {inprogressbooks.map((data, index) => {
        const { books, current_paragraph, last_updated_at } = data
      
        return (
          <View key={index} style={tw`p-4 rounded-lg rounded-2xl mb-4 ${theme === 'light' ? 'border-dark' : 'border-light'}}`}>
            {/* Container with relative positioning to overlay content */}
            <View style={tw`overflow-hidden rounded-lg mb-4 relative`}>
              <Image
                source={{ uri: books.cover_image_url }}
                style={tw`w-full h-50`}
              />
              {/* Current paragraph badge at top right */}
              <View style={tw`absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded-full flex-row items-center`}>
                <Foundation name="page-multiple" size={16} style={tw`text-accent mr-1`} />
                <QuickSandText style={tw`text-xs text-accentlight`}>
                  {current_paragraph}
                </QuickSandText>
              </View>
              {/* Overlay for genres */}
              <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
                {books.book_genres?.map((genre, idx) => (
                  <Genre genre={genre.genres.name} key={idx} />
                ))}
              </View>
            </View>

            {/* Other book details */}
            <QuickSandText style={tw`text-xl font-bold mb-2`}>
              {books.title}
            </QuickSandText>
            <QuickSandText style={tw`text-base my-2`} numberOfLines={4}>
              {books.description}
            </QuickSandText>
            <QuickSandText style={tw`text-xs text-gray-500`}>
              {convertTime(last_updated_at, is24Hr)}
            </QuickSandText>
          </View>
          // <BookContainer book={books} />
        )
      }
      )}
    </View>
  )
}

export default InProgressBooks

interface Genre {
  name: string;
}

interface BookGenre {
  genres: Genre;
}

interface BookDetails {
  book_genres: BookGenre[];
  cover_image_url: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  updated_at: string;
}

type BookStatus = 'UPDATED' | 'COMPLETED' | null;

interface BookActivity {
  book_id: string;
  books: BookDetails;
  completed_at: string | null;
  current_paragraph: number;
  last_updated_at: string;
  paragraph_id: string;
  started_at: string;
  status: BookStatus;
  total_time_spent: number | null;
  user_id: string;
}