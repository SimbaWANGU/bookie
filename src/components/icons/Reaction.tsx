import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDynamicValue } from '@constants/Functions'
import tw from '@utils/tailwind'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Reaction = () => {
  const emojis = ['🔥', '😍', '👍', '😢', '😡']
  const [reaction, setReaction] = useState<string | null>(null)
  const [showReactions, setShowReactions] = useState(false)  

  const toggleReactionOptions = () => {
    setShowReactions((prev) => !prev)
  }

  const selectReaction = (emoji: string) => {
    // Toggle off if same emoji is selected
    const newReaction = reaction === emoji ? null : emoji
    setReaction(newReaction)
    // onReact && onReact(newReaction)
    setShowReactions(false)
  }

  return (
    <View style={tw`relative`}>
      <TouchableOpacity onPress={toggleReactionOptions} style={tw`p-2`}>
      <TouchableOpacity onPress={toggleReactionOptions} style={tw`p-2`}>
        {reaction ? (
          <Text style={{ fontSize: getDynamicValue(50) }}>{reaction}</Text>
        ) : (
          <MaterialCommunityIcons
            name="emoticon-outline"
            size={getDynamicValue(50)}
            color="gray"
          />
        )}
      </TouchableOpacity>
      </TouchableOpacity>
      {showReactions && (
        <View
          style={[
            tw`flex-row items-center space-x-2 z-20`,
            {
              position: 'absolute',
              bottom: getDynamicValue(60), // Adjust this value to control vertical spacing above the icon
              left: 0,
              right: 0,
              justifyContent: 'center',
            },
          ]}
        >
          {emojis.map((emoji, idx) => (
            <TouchableOpacity key={idx} onPress={() => selectReaction(emoji)} style={tw`p-1`}>
              <Text style={tw`text-xl`}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default Reaction