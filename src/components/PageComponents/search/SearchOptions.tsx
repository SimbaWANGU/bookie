// components/ActivityFilter.tsx
import React, { useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useAtom } from 'jotai'
import tw from '@utils/tailwind'
import { searchOptionsAtom, SearchOptionProps } from '@stores/search.state'
import { LegendList, LegendListRef } from "@legendapp/list"

const FILTERS: { label: string; value: SearchOptionProps }[] = [
  { label: 'Authors', value: 'authors' },
  { label: 'Books', value: 'books' },
  { label: 'Pages', value: 'pages' },
  { label: 'Users', value: 'users' },
]

const SearchOptions = () => {
  const listRef = useRef<LegendListRef | null>(null)
  const [searchOption, setSearchOptions] = useAtom(searchOptionsAtom)

  return (
    <View style={tw`py-4 px-4`}>
      <LegendList
        ref={listRef}
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item.value || 'all'}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = searchOption === item.value
          return (
            <Pressable
              onPress={() => {
                if (searchOption === item.value) {
                  setSearchOptions('')
                } else {
                  setSearchOptions(item.value)
                }
              }}
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