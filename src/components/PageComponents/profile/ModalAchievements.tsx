import React, { useRef } from 'react'
import { Modal, View, useColorScheme, SafeAreaView, Text } from 'react-native'
import Reviewsheader from '@components/headers/modalsHeader'
import tw from '@utils/tailwind'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import {
  achievementTimeThresholds,
  achievementBookThresholds,
} from '@constants/Achievements'
import type { Achievement } from '@models/achievement.type'
import AchievementCard from './AchievementCard'
import { LegendList, LegendListRef } from '@legendapp/list'

interface AchievementsProps {
  achievementsModalVisisble: boolean
  setAchievementsModalVisible: (bool: boolean) => void
}

interface UserAchievement {
  earned_at: string
  key: string
  user_id: string
}

const ModalAchievements: React.FC<AchievementsProps> = ({ achievementsModalVisisble,  setAchievementsModalVisible }) => {
  const theme = useColorScheme()
  const [user] = useAtom(userAtom)
  const listRef = useRef<LegendListRef | null>(null)

  const { data: achievements, isLoading, error } = useQuery({
    queryKey: ['user_achievements', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user?.id)

      if (error) throw new Error(error.message)
      return data
    },
  })

  if (isLoading || error || !achievements) {
    return null
  }

  const allAchievements: Achievement[] = [
    ...achievementTimeThresholds,
    ...achievementBookThresholds,
  ]

  const getUserAchievementsDetails = (
    earnedAchievements: UserAchievement[],
  ): Achievement[] => {
    const achievementMap = new Map<string, Achievement>()
    allAchievements.forEach((a) => achievementMap.set(a.key, a))

    return earnedAchievements
      .map((ea) => achievementMap.get(ea.key))
      .filter((a): a is Achievement => Boolean(a))
  }

  const userAchievementsToDisplay =
    getUserAchievementsDetails(achievements)

  return (
    <Modal
      animationType="slide"
      visible={achievementsModalVisisble}
      onRequestClose={() => setAchievementsModalVisible(false)}
    >
      <SafeAreaView
        style={[
          tw`flex-1`,
          theme === 'light' ? tw`bg-white` : tw`bg-black`,
        ]}
      >
        <Reviewsheader
          setModalVisible={setAchievementsModalVisible}
          title="Achievements"
        />
        <LegendList
          data={userAchievementsToDisplay}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <AchievementCard achievement={item} />
          )}
          contentContainerStyle={tw`p-4 pb-32`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={tw`flex-1 py-2 items-center justify-center mt-32`}>
              <Text
                style={[
                  tw`text-lg font-semibold`,
                  theme === 'light' ? tw`text-gray-800` : tw`text-gray-200`,
                ]}
              >
                No achievements yet
              </Text>
              <Text
                style={[
                  tw`text-base text-center mt-2 px-6`,
                  theme === 'light' ? tw`text-gray-500` : tw`text-gray-400`,
                ]}
              >
                Keep reading and exploring to unlock your first achievement!
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  )
}

export default ModalAchievements