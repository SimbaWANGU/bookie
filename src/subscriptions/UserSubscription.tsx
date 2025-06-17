import { addNewAchievement } from '@api/achievement/api.achievements'
import { achievementBookThresholds, achievementTimeThresholds } from '@constants/Achievements'
import { getNewAchievements } from '@constants/Functions'
import { QueryKeys } from '@constants/QueryKeys'
import { Achievement } from '@models/achievement.type'
import { CustomUser } from '@models/userProfile.type'
import { userAtom } from '@stores/user.state'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@utils/supabase'
import { useAudioPlayer } from 'expo-audio'
import { useGlobalSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Toast } from 'toastify-react-native'
import audioOne from '@audio/one.wav'
import audioTwo from '@audio/two.wav'
import audioThree from '@audio/three.wav'
import audioFour from '@audio/four.wav'

const rarityToToastType: Record<Achievement['rarity'], 'default' | 'error' | 'info' | 'success'> = {
  Common: 'default',
  Uncommon: 'error',
  Rare: 'info',
  Epic: 'success',
  Mythic: 'success',
  Legendary: 'success'
}

const UserSubscription = () => {
  const [user] = useAtom(userAtom)
  const { user: userSearchParam } = useGlobalSearchParams()
  const queryClient = useQueryClient()

  // ✅ Use hooks at the top
  const playerCommon = useAudioPlayer(audioOne)
  const playerRare = useAudioPlayer(audioTwo)
  const playerLegendary = useAudioPlayer(audioThree)
  const playerMythic = useAudioPlayer(audioFour)

  const addNewAchievementMutation = useMutation({
    mutationKey: [],
    mutationFn: async ({ userId, key }: { userId: string, key: string }) =>
      await addNewAchievement(userId, key),
  })

  const handleAchievementUpdate = (
    oldValue: number,
    newValue: number,
    thresholds: typeof achievementTimeThresholds | typeof achievementBookThresholds,
    userId: string
  ) => {
    const newAchievements = getNewAchievements(oldValue, newValue, thresholds)

    newAchievements.forEach((achievement, index) => {
      const toastType = rarityToToastType[achievement.rarity]

      if (toastType) {
        setTimeout(() => {
          // ✅ Safe switch to play already initialized players
          switch (achievement.rarity) {
            case 'Common':
            case 'Uncommon':
              playerCommon.play()
              break
            case 'Rare':
            case 'Epic':
              playerRare.play()
              break
            case 'Legendary':
              playerLegendary.play()
              break
            case 'Mythic':
              playerMythic.play()
              break
            default:
              break
          }

          Toast.show({
            type: toastType,
            text1: achievement.title,
            text2: achievement.description,
            visibilityTime: 10000,
          })
        }, 10000 * index)
      }

      addNewAchievementMutation.mutate({ userId, key: achievement.key })
    })
  }

  useEffect(() => {
    if (!user?.id) return

    const subscription = supabase.channel(`${user.id}-user-update-channel`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'users', filter: `id=eq.${user.id}` },
        async (payload) => {
          const oldObj = payload.old as CustomUser
          const newObj = payload.new as CustomUser

          handleAchievementUpdate(oldObj.total_time_spent, newObj.total_time_spent, achievementTimeThresholds, user.id)
          handleAchievementUpdate(oldObj.completed_books, newObj.completed_books, achievementBookThresholds, user.id)

          queryClient.invalidateQueries({ queryKey: [QueryKeys.getUser] })

          if (
            oldObj.follower_count !== newObj.follower_count ||
            oldObj.following_count !== newObj.following_count
          ) {
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.otherUser, userSearchParam],
            })
          }
        }
      )
      .subscribe((_, err) => {
        if (err) throw new Error(err.message)
      })

    return () => {
      supabase.removeChannel(subscription).then()
    }
  }, [user, userSearchParam])

  return null
}

export default UserSubscription