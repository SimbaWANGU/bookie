import { fetchBooksInProgress } from '@api/profile/api.user'
import Genre from '@components/styled/Genre'
import { QuickSandTextBold, QuickSandTextLight, QuickSandTextRegular } from '@components/styled/StyledText'
import { convertTime } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import Foundation from '@expo/vector-icons/Foundation'
import { timeFormatAtom } from '@stores/settings.state'
import { userAtom } from '@stores/user.state'
import { useQuery } from '@tanstack/react-query'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { useAtom } from 'jotai'
import React from 'react'
import { ActivityIndicator, View, useColorScheme } from 'react-native'

interface CompletedBooksProps {
  id?: string
}

const CompletedBooks: React.FC<CompletedBooksProps> = ({ id }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)
  const [is24Hr] = useAtom(timeFormatAtom)
  
  const { data: completedBooks, isLoading, error } = useQuery<BookActivity[]>({
    queryKey: [QueryKeys.completedBooks, id ?? user?.id],
    queryFn: async () => await fetchBooksInProgress(id ?? user?.id as string, 'COMPLETED')
  })

  if (isLoading) {
    return (
      <ActivityIndicator size='large' />
    )
  }

  if (error || !completedBooks) {
    return (
      <></>
    )
  }

  if (completedBooks.length === 0) {
    return (
      <View style={tw``}>
        <QuickSandTextRegular style={tw`text-base text-gray-400`}>
          Opened books will appear here
        </QuickSandTextRegular>
      </View>
    )
  }

  return (
    <View>
      {completedBooks.map((data, index) => {
        const { books, current_paragraph, last_updated_at } = data
      
        return (
          <View key={index} style={tw`p-4 rounded-lg rounded-2xl mb-4 bg-transparent`}>
            {/* Container with relative positioning to overlay content */}
            <View style={tw`overflow-hidden rounded-lg mb-4 relative`}>
              <Image
                source={{ uri: books.cover_image_url }}
                style={tw`w-full h-50`}
              />
              {/* Current paragraph badge at top right */}
              <View style={tw`absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded-full flex-row items-center`}>
                <Foundation name="page-multiple" size={16} style={tw`text-accent mr-1`} />
                <QuickSandTextRegular style={tw`text-xs text-accentlight`}>
                  {current_paragraph}
                </QuickSandTextRegular>
              </View>
              {/* Overlay for genres */}
              <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
                {books.book_genres?.map((genre, idx) => (
                  <Genre genre={genre.genres.name} key={idx} />
                ))}
              </View>
            </View>

            {/* Other book details */}
            <QuickSandTextBold style={tw`text-xl font-bold mb-2`}>
              {books.title}
            </QuickSandTextBold>
            <QuickSandTextLight style={tw`text-base my-2`} numberOfLines={4}>
              {books.description}
            </QuickSandTextLight>
            <QuickSandTextRegular style={tw`text-xs text-gray-500`}>
              {convertTime(last_updated_at, is24Hr)}
            </QuickSandTextRegular>
          </View>
          // <BookContainer book={books} />
        )
      }
      )}
    </View>
  )
}

export default CompletedBooks

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