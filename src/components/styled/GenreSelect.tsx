import { Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import tw from '@utils/tailwind'

interface GenreSelectProps {
  selected: boolean
  toggle: (id: string) => void
  name: string
}

const GenreSelect: React.FC<GenreSelectProps> = ({ selected, toggle, name }) => {
  const theme = useColorScheme()

  return (
    <TouchableOpacity
      onPress={() => toggle(name)}
      style={tw.style(
        'py-3 px-5 rounded-full border',
        selected
          ? 'bg-accent'
          : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
      )}
    >
      <Text
        style={tw.style(
          'text-lg',
          selected ? 'text-white' : 'text-accent'
        )}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}

export default GenreSelect