import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { achievementBookThresholds } from '@constants/Achievements'
import useUser from '@hooks/useUser'

const checkAndAwardAchievement = (booksCompleted: number): { threshold: number, title: string, description: string } | null => {
	const award = achievementBookThresholds.find(achievement => {
		if (booksCompleted === achievement.threshold) {
			return achievement.description
		}
		return null
	})
	if (award === undefined) {
		return null
	}
	return award
}

const useBookCompletedAchievement = (): [{ threshold: number, title: string, description: string } | null, Dispatch<SetStateAction<{ threshold: number, title: string, description: string } | null>>] => {
	const [user] = useUser()
	const booksCompleted = user?.completed ? user.completed.length : 0
	const [achievement, setAchievement] = useState<{ threshold: number, title: string, description: string } | null>(null)

	useEffect(() => {
		const award = checkAndAwardAchievement(booksCompleted)
		if (award !== null) {
			setAchievement(award)
		}
	}, [booksCompleted])

	return [achievement, setAchievement]
}

export default useBookCompletedAchievement
