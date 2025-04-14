import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QuickSandText } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'

interface ReviewedBooksProps {
  id?: string
}

const CompletedBooks: React.FC<ReviewedBooksProps> = ({ id }) => {
  const [user] = useAtom(userAtom)
  const { data, isLoading, error } = useQuery({
    queryKey: ['completed_books', id ?? user?.id],
    queryFn: async () => []
  })

  if (isLoading) {
    return (
      <ActivityIndicator size='large' />
    )
  }

  if (error || !data) {
    return (
      <></>
    )
  }

  if (data.length === 0) {
    return (
      <View style={tw``}>
        <QuickSandText style={tw`text-base text-gray-400`}>
          Books you&apos;ve completed will appear here
        </QuickSandText>
      </View>
    )
  }

  return (
    <View>
      <Text>CompletedBooks</Text>
    </View>
  )
}

export default CompletedBooks