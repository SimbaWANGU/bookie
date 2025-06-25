import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, useColorScheme } from 'react-native';
import tw from '@utils/tailwind';
import { useQuery } from '@tanstack/react-query';
import { getGenres } from '@api/books/api.genres';
import GenreSelect from '@components/styled/GenreSelect';
import { getDynamicValue } from '@constants/Functions';
import { QuickSandText } from '@components/styled/StyledText';
import { useAtom } from 'jotai';
import { bookPreferencesAtom } from '@stores/preference.state';
import { router } from 'expo-router';

interface Genre {
  id: string;
  name: string;
}

const choose = () => {
  const theme = useColorScheme()
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [, setBookPreferences] = useAtom(bookPreferencesAtom)

  const { data: genres, isLoading, error } = useQuery<Genre[]>({
    queryKey: ['all-genres'],
    queryFn: getGenres
  })

  // Toggle helper
  const toggle = (genres: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genres) ? prev.filter((x) => x !== genres) : [...prev, genres]
    );
  };

  if (isLoading) {
    return <ActivityIndicator style={tw`flex-1 justify-center`} />;
  }

  return (
    <View style={tw`flex-1 p-4 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <View style={[tw`items-center justify-center`, {
        height: getDynamicValue(200)
      }]}>
        <QuickSandText style={tw`android:text-3xl ios:text-2xl font-bold text-center mt-4 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
          Step into your favorite worlds
        </QuickSandText>
        <QuickSandText style={tw`android:text-xl ios:text-lg text-center mb-4 ${theme === 'light' ? 'text-dark' : 'text-light'}`}>
          Select at least 
          <QuickSandText style={tw`font-bold`}> Three </QuickSandText> 
          to shape your Book Worms journey
        </QuickSandText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`py-2`} >
        <View style={tw`flex flex-row flex-wrap gap-3`}>
          {genres?.map((item) => {
            const selected = selectedGenres.includes(item.name)
            return (
              <GenreSelect key={item.id} selected={selected} toggle={toggle} name={item.name}  />
            )
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={selectedGenres.length === 0}
        onPress={() => {
          setBookPreferences(selectedGenres)
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }}
        style={tw.style(
          'mt-auto mb-4 py-3 rounded-full items-center',
            selectedGenres.length > 2
            ? 'bg-accent'
            : 'bg-gray-300',
          'dark:bg-primary-dark'
        )}
      >
        <Text style={tw`text-base font-bold text-white`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

export default choose