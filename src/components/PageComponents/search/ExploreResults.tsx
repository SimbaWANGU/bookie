import tw from '@utils/tailwind';
import React, { useEffect, useRef, useState } from 'react';

import { TouchableOpacity, View } from 'react-native';
import { Image, ImageBackground } from 'expo-image'
import { ResponsiveGrid } from 'react-native-flexible-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { dark } from '@constants/Color';
import { fetchBooks } from '@api/books/api.books';
import { QueryKeys } from '@constants/QueryKeys';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@models/book.type';
import { QuickSandText } from '@components/styled/StyledText';
import Genre from '@components/styled/Genre';
import Author from '../synopsis/Author';
 
const ExploreResults = () => {
  let idCounter = useRef(0);
  const [data, setData] = useState<DataProp[]>([]);

  interface DataProp {
    id: number;
    widthRatio?: number;
    heightRatio?: number;
    imageUrl: string;
  }

  const generateData = () => {
    const originalData = [
      {
        imageUrl: 'https://picsum.photos/200/300?random=3',
        widthRatio: 1,
        heightRatio: 2,
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=1',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=2',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=4',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=5',
        widthRatio: 1,
        heightRatio: 2,
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=6',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=3',
        widthRatio: 1,
        heightRatio: 2,
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=1',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=2',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=4',
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=5',
        widthRatio: 1,
        heightRatio: 2,
      },
      {
        imageUrl: 'https://picsum.photos/200/300?random=6',
      },
    ];

    let clonedData: DataProp[] = [];

    for (let i = 0; i < 5; i++) {
      const newData = originalData.map((item) => ({
        ...item, 
        id: ++idCounter.current,
      }));
      clonedData = newData
    }

    return clonedData;
  };

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: [QueryKeys.featuredBooks],
    queryFn: fetchBooks,
  })

  const renderItem = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity style={tw`flex-1 m-1 rounded overflow-hidden`} activeOpacity={0.9}>
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
          <QuickSandText
            numberOfLines={2}
            style={tw`text-white font-bold text-base mt-1`}
          >
            {item.title}
          </QuickSandText>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setData(generateData());
  }, []);

  return (
    <View
      style={tw`flex-1`}
    >
      <ResponsiveGrid
        maxItemsPerColumn={2} // changed from 3 to 2
        data={books.map((book, index) => ({
          ...book,
          widthRatio: index === 0 || index === 4 ? 1 : undefined,
          heightRatio: index === 0 || index === 4 ? 2 : undefined,
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