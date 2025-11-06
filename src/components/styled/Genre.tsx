import { bookPreferencesAtom } from '@stores/preference.state'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React from 'react'
import { View } from 'react-native'
import { QuickSandTextRegular } from './StyledText'

interface GenreProps {
  genre: string
}

const Genre: React.FC<GenreProps> = ({ genre }) => {
  const [bookPreferences] = useAtom(bookPreferencesAtom)
  const isPreferred = bookPreferences.includes(genre)

  return (
    <View
      style={tw.style(
        'px-2 py-1 rounded-full mr-1 mb-1',
        isPreferred
          ? 'bg-accent/90'
          : 'bg-gray-300 dark:bg-gray-700'
      )}
    >
      <QuickSandTextRegular
        style={tw.style(
          'text-xs font-bold',
          isPreferred ? 'text-light' : 'text-dark dark:text-light'
        )}
      >
        {genre}
      </QuickSandTextRegular>
    </View>
  )
}

export default Genre