import { fetchExploreBooks } from '@api/books/api.books';
import Genre from '@components/styled/Genre';
import { QuickSandTextRegular } from '@components/styled/StyledText';
import { QueryKeys } from '@constants/QueryKeys';
import { Book } from '@models/book.type';
import { useQuery } from '@tanstack/react-query';
import tw from '@utils/tailwind';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ResponsiveGrid } from 'react-native-flexible-grid';
 
const ExploreResults = () => {
  interface DataProp {
    id: number;
    widthRatio?: number;
    heightRatio?: number;
    imageUrl: string;
  }

  // add genres prefences to query
  const { data: books = [] } = useQuery<Book[]>({
    queryKey: [QueryKeys.exploreBooks],
    queryFn: fetchExploreBooks,
  })

  const renderItem = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity
        style={tw`flex-1 m-1 rounded overflow-hidden`}
        activeOpacity={0.9}
        onPress={() => router.push(`/book/${item.id}`)}
      >
        <Image
          source={{ uri: item.cover_image_url }}
          contentFit="cover"
          style={tw`w-full h-full bg-zinc-900`}
        />
        <LinearGradient
          colors={['#00000040', '#000000c0']}
          locations={[0.5, 1]}
          style={tw`absolute h-full w-full justify-end p-3`}
        >
          {/* Genres */}
          {item.book_genres && item.book_genres.length > 0 && (
            <View style={tw`flex-row flex-wrap mb-2`}>
              {item.book_genres.map((genreItem, index) => (
                <Genre key={index} genre={genreItem.genres.name} />
              ))}
            </View>
          )}
    
          {/* Title */}
          <QuickSandTextRegular
            numberOfLines={2}
            style={tw`text-white font-bold text-base mt-1`}
          >
            {item.title}
          </QuickSandTextRegular>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={tw`flex-1`}
    >
      <ResponsiveGrid
        maxItemsPerColumn={2} // changed from 3 to 2
        data={books.map((book, index) => ({
          ...book,
          widthRatio: index % 4 === 0 ? 1 : undefined,
          heightRatio: index % 4 === 0 ? 2 : undefined,
        }))}
        renderItem={renderItem}
        showScrollIndicator={false}
        style={tw``}
        keyExtractor={(item: DataProp) => item.id.toString()}
      />
    </View>
  );
}

export default ExploreResults