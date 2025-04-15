import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@constants/QueryKeys'

const TrendingExcerpts = () => {
  const {  } = useQuery({
    queryKey: [QueryKeys.trendingExcerpts],
    queryFn: async () => {}
  })
  return (
    <View>
      <Text>TrendingExcerpts</Text>
    </View>
  )
}

export default TrendingExcerpts