import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { QuickSandText } from '@components/styled/StyledText';
import tw from '@utils/tailwind';
import { useAtom } from 'jotai';
import { userAtom } from '@stores/user.state';
import { fetchReviewedBooks } from '@api/profile/api.user';
import { Image } from 'expo-image';
import { convertTime } from '@constants/Functions';

interface ReviewedBooksProps {
  id?: string
}

const ReviewedBooks: React.FC<ReviewedBooksProps> = ({ id }) => {
  const [user] = useAtom(userAtom);
  const { data: reviewedBooks, isLoading, error } = useQuery<BookReview[]>({
    queryKey: ['reviewed_books', id ?? user?.id],
    queryFn: async () => fetchReviewedBooks(id ?? user?.id as string)
  });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error || !reviewedBooks) {
    return <></>;
  }

  if (reviewedBooks.length === 0) {
    return (
      <View style={tw``}>
        <QuickSandText style={tw`text-base text-gray-400`}>
          Reviewed books will appear here
        </QuickSandText>
      </View>
    );
  }

  return (
    <View>
      {reviewedBooks.map((data, index) => {
        const { books, review, created_at, users } = data;

        return (
          <View key={index} style={tw`bg-white/90 p-4 rounded-lg shadow mb-4`}>
            {/* Book cover with genre overlay */}
            <View style={tw`overflow-hidden rounded-lg mb-4 relative`}>
              <Image
                source={{ uri: books.cover_image_url }}
                style={tw`w-full h-40 rounded-md`}
              />
              {/* Overlay for genres */}
              <View style={tw`absolute bottom-0 left-0 right-0 flex-row flex-wrap p-2`}>
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
              </View>
            </View>

            {/* Book Title */}
            <QuickSandText style={tw`text-xl font-bold mb-2`}>
              {books.title}
            </QuickSandText>

            {/* Review Text */}
            <QuickSandText style={tw`text-base mb-2`} numberOfLines={4}>
              {review}
            </QuickSandText>

            {/* Footer with Reviewer and Timestamp */}
            <View style={tw`flex-row items-center justify-between`}>
              <QuickSandText style={tw`text-xs text-gray-500`}>
                {users.name}
              </QuickSandText>
              <QuickSandText style={tw`text-xs text-gray-500`}>
                {convertTime(created_at, false)}
              </QuickSandText>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ReviewedBooks;

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

interface User {
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  user_name: string;
}

interface BookReview {
  book_id: string;
  books: BookDetails;
  created_at: string;
  review: string;
  user_id: string;
  users: User;
}