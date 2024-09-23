import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { achievementTimeThresholds } from '@constants/Achievements'
import useUser from './useUser'


const checkAndAwardAchievement = (readingTime: number): { threshold: number, title: string, description: string } | null => {
	const award = achievementTimeThresholds.find(achievement => {
		if (readingTime === achievement.threshold) {
			return achievement.description
		}
		return null
	})
	if (award === undefined) {
		return null
	}
	return award
}

const useReadingTimeAchievement = (comTime: number): [{ threshold: number, title: string, description: string } | null, Dispatch<SetStateAction<{ threshold: number, title: string, description: string } | null>>] => {
	const [user] = useUser()
	const readingTime = user?.cumulative_time as number + comTime

	const [achievement, setAchievement] = useState<{ threshold: number, title: string, description: string } | null>(null)

	useEffect(() => {
		const award = checkAndAwardAchievement(readingTime)
		if (award !== null) {
			setAchievement(award)
		}
	}, [readingTime])

	return [achievement, setAchievement]
}

export default useReadingTimeAchievement
