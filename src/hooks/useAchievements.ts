import { achievementTimeThresholds } from '@constants/Achievements'
import { Achievement } from '@models/achievement.type'
import { awardedAchievementsAtom } from '@stores/achievement.state'
import { useAtom } from 'jotai'

/** holds the list of time‐based achievements we’ve already shown */
export function useAchievements() {
  const [awarded, setAwarded] = useAtom(awardedAchievementsAtom)

  /** 
   * given old vs new total_time_spent,  
   * returns only those thresholds we’ve just crossed 
   */
  function checkTimeAchievements(oldTime: number, newTime: number): Achievement[] {
    const newly: Achievement[] = achievementTimeThresholds
      .filter(a => oldTime < a.threshold && a.threshold <= newTime)
      .filter(a => !awarded.find(x => x.threshold === a.threshold))

    if (newly.length) {
      setAwarded([...awarded, ...newly])
    }
    return newly
  }

  return { awarded, checkTimeAchievements }
}