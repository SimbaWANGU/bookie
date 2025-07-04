import { QuickSandTextRegular } from '@components/styled/StyledText'
import { View } from '@components/styled/Themed'
import { textSizeMap } from '@constants/TextSizeMap'
import { textSizeAtom } from '@stores/settings.state'
import { getScreenSizeCategory } from '@utils/index'
import tw from '@utils/tailwind'
import { useAtom } from 'jotai'
import React from 'react'
import { Dimensions, Text, useColorScheme } from 'react-native'

interface storySwiperProps {
  content: string
  metadata: string
}

const PAGE_WIDTH = Dimensions.get('window').width

type Segment = {
  text: string
  italic: boolean
}

function formatDialogueWithItalics(text: string): Segment[][] {
  const sentences = text
    .replace(/([.!?”])\s+(?=[A-Z0-9])/g, '$1|') // sentence end
    .split('|')
    .map(sentence => sentence.trim())
    .filter(Boolean)

  return sentences.map(sentence => {
    const parts = sentence.split(/(".*?")/).filter(Boolean)
    return parts.map(part => ({
      text: part,
      italic: /^".*?"$/.test(part),
    }))
  })
}

const Page: React.FC<storySwiperProps> = ({ content, metadata }) => {
  const theme = useColorScheme()
  const [textSize] = useAtom(textSizeAtom)
  const fontSize = textSizeMap[getScreenSizeCategory()][textSize]

  const isDialogue = metadata === 'd'

  return (
    <View
      style={[
        tw`flex-1 justify-center items-center ${theme === 'light' ? 'bg-light' : 'bg-dark'}`,
        { width: PAGE_WIDTH },
      ]}
    >
      {isDialogue ? (
        <View style={tw`w-11/12 px-4`}>
          {formatDialogueWithItalics(content).map((lineSegments, lineIndex) => (
            <Text
              key={lineIndex}
              style={tw`${fontSize} ${theme === 'light' ? 'text-dark' : 'text-light'} text-left mb-1 px-2`}
            >
              {lineSegments.map((segment, segIndex) => (
                <Text
                  key={segIndex}
                  style={segment.italic ? { fontStyle: 'italic' } : undefined}
                >
                  {segment.text}
                </Text>
              ))}
            </Text>
          ))}
        </View>
      ) : content.length < 50 ? (
        <QuickSandTextRegular
          style={tw`${theme === 'light' ? 'text-dark' : 'text-light'} text-center text-4xl w-11/12`}
        >
          {content}
        </QuickSandTextRegular>
      ) : (
        <Text
          style={tw`${fontSize} ${theme === 'light' ? 'text-dark' : 'text-light'} text-center w-full px-2`}
        >
          {content}
        </Text>
      )}
    </View>
  )
}

export default Page