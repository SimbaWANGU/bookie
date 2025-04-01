import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const TrendingExcerpts = () => {
  const { data: excerpts = [], isLoading, error } = useQuery({
    queryKey: ['trending-excerpts'],
    queryFn: async () => {}
  })
  return (
    <View>
      <Text>TrendingExcerpts</Text>
    </View>
  )
}

export default TrendingExcerpts