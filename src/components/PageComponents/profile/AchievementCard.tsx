import React from 'react'
import { View, Text, useColorScheme, ColorSchemeName } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { Achievement } from '@models/achievement.type'
import tw from '@utils/tailwind'

interface Props {
  achievement: Achievement
}

const rarityBaseStyles = {
  Common: {
    color: '#9e9e9e',
    icon: 'checkbox-marked-circle-outline',
  },
  Uncommon: {
    color: '#4caf50',
    icon: 'star-circle-outline',
  },
  Rare: {
    color: '#2196f3',
    icon: 'trophy-outline',
  },
  Epic: {
    color: '#9c27b0',
    icon: 'crystal-ball',
  },
  Legendary: {
    color: '#ff9800',
    icon: 'crown-outline',
  },
  Mythic: {
    color: '#e91e63',
    icon: 'fire',
  },
}

const getBgClass = (rarity: string, theme: ColorSchemeName) => {
  const base = {
    Common: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
    Uncommon: theme === 'dark' ? 'bg-green-900' : 'bg-green-100',
    Rare: theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100',
    Epic: theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100',
    Legendary: theme === 'dark' ? 'bg-amber-900' : 'bg-amber-100',
    Mythic: theme === 'dark' ? 'bg-pink-900' : 'bg-pink-100',
  }
  return base[rarity] || 'bg-gray-100'
}

const getTextClass = (rarity: string, theme: ColorSchemeName) => {
  const base = {
    Common: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    Uncommon: theme === 'dark' ? 'text-green-300' : 'text-green-700',
    Rare: theme === 'dark' ? 'text-blue-300' : 'text-blue-700',
    Epic: theme === 'dark' ? 'text-purple-300' : 'text-purple-700',
    Legendary: theme === 'dark' ? 'text-amber-300' : 'text-amber-700',
    Mythic: theme === 'dark' ? 'text-pink-300' : 'text-pink-700',
  }
  return base[rarity] || 'text-gray-700'
}

const AchievementCard: React.FC<Props> = ({ achievement }) => {
  const theme = useColorScheme()
  const base = rarityBaseStyles[achievement.rarity]
  const bgClass = getBgClass(achievement.rarity, theme)
  const textClass = getTextClass(achievement.rarity, theme)

  return (
    <View style={tw`flex-row items-center p-4 rounded-2xl mb-3 ${bgClass}`}>
      <MaterialCommunityIcons
        name={base.icon as any}
        size={32}
        color={base.color}
        style={tw`mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-semibold ${textClass}`}>
          {achievement.title}
        </Text>
        <Text style={tw`text-sm mt-1 text-gray-600 dark:text-gray-300`}>
          {achievement.description}
        </Text>
        <Text style={tw`text-xs mt-2 italic ${textClass}`}>
          {achievement.rarity}
        </Text>
      </View>
    </View>
  )
}

export default AchievementCard