import React, { useRef } from 'react'
import { Pressable, Text, View, useColorScheme } from 'react-native'
import { useAtom } from 'jotai'
import tw from '@utils/tailwind'
import { activityFilterAtom, ActivityFilter as ActivityType } from '@stores/filter.state'
import { LegendList, LegendListRef } from '@legendapp/list'

const FILTERS: { label: string; value: ActivityType }[] = [
  { label: 'All', value: '' },
  { label: 'Authors', value: 'authors' },
  { label: 'Likes', value: 'likes' },
  { label: 'Reviews', value: 'reviewed' },
]

const ActivityFilter = () => {
  const theme = useColorScheme()
  const [filter, setFilter] = useAtom(activityFilterAtom)
  const listRef = useRef<LegendListRef | null>(null)

  return (
    <View style={tw`py-4 px-4 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <LegendList
        ref={listRef}
        horizontal
        data={FILTERS}
        keyExtractor={(item) => item.value || 'all'}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = filter === item.value
          return (
            <Pressable
              onPress={() => setFilter(item.value)}
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

export default ActivityFilter