import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { fetchLikedBooks } from '@api/profile/api.user'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { Image } from 'expo-image'
import { convertTime } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { timeFormatAtom } from '@stores/settings.state'

interface LikedBooksProps {
  id?: string
}

const LikedBooks: React.FC<LikedBooksProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const [is24Hr] = useAtom(timeFormatAtom)
  const { data: likedBooks, isLoading, error } = useQuery<LikedBook[]>({
    queryKey: [QueryKeys.likedBooks, id ?? user?.id],
    queryFn: async () => fetchLikedBooks(id ?? user?.id as string)
  })

  if (isLoading) {
    return (
      <ActivityIndicator size='large' />
    )
  }

  if (error || !likedBooks) {
    return (
      <></>
    )
  }

  if (likedBooks.length === 0) {
    return (
      <View style={tw``}>
        <QuickSandText style={tw`text-base text-gray-400`}>
          Liked books will appear here
        </QuickSandText>
      </View>
    )
  }

  return (
    <View>
      {likedBooks.map((data, index) => {
        const { books, created_at } = data
      
        return (
          <View key={index} style={tw`bg-white/90 p-4 rounded-lg shadow mb-4`}>
            {/* Container with relative positioning to overlay content */}
            <View style={tw`overflow-hidden rounded-lg mb-4 relative`}>
              <Image
                source={{ uri: books.cover_image_url }}
                style={tw`w-full h-50`}
              />
              {/* Current paragraph badge at top right */}
              {/* <View style={tw`absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded-full flex-row items-center`}>
                <Foundation name="page-multiple" size={16} style={tw`text-accent mr-1`} />
                <QuickSandText style={tw`text-xs text-accentlight`}>
                  {current_paragraph}
                </QuickSandText>
              </View> */}
              {/* Overlay for genres */}
              <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
                {books.book_genres?.map((genre, index) => (
                  <View
                    key={index}
                    style={tw`px-2 py-1 rounded-full mr-1 mb-1 bg-accent/75`}
                  >
                    <QuickSandText style={tw`text-xs font-bold text-light`}>
                      {genre.genres.name}
                    </QuickSandText>
                  </View>
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
              {convertTime(created_at, is24Hr)}
            </QuickSandText>
          </View>
          // <BookContainer book={books} />
        )
      }
      )}
    </View>
  )
}

export default LikedBooks

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

interface LikedBook {
  book_id: string;
  books: BookDetails;
  created_at: string;
  user_id: string;
}