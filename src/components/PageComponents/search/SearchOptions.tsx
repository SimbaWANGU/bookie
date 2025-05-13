// components/ActivityFilter.tsx
import React from 'react'
import { FlatList, Pressable, Text, View, useColorScheme } from 'react-native'
import { useAtom } from 'jotai'
import tw from '@utils/tailwind'
import { searchOptionsAtom, SearchOptionProps } from '@stores/search.state'

const FILTERS: { label: string; value: SearchOptionProps }[] = [
  { label: 'Authors', value: 'authors' },
  { label: 'Books', value: 'books' },
  { label: 'Pages', value: 'pages' },
  { label: 'Users', value: 'users' },
]

const SearchOptions = () => {
  const theme = useColorScheme()
  const [searchOption, setSearchOptions] = useAtom(searchOptionsAtom)

  return (
    <View style={tw`py-4 px-4`}>
      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item.value || 'all'}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = searchOption === item.value
          return (
            <Pressable
              onPress={() => setSearchOptions(item.value)}
              style={tw.style(
                'px-4 py-2 rounded-full mr-2',
                isActive ? 'bg-accent' : 'bg-white border border-gray-300'
              )}
            >
              <Text style={tw.style(isActive ? 'text-white' : 'text-black')}>
                {item.label}
              </Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default SearchOptions