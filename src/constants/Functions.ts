import { Dimensions } from 'react-native'
import { achievementTimeThresholds } from './Achievements'
import { Achievement } from '@models/achievement.type'
import { UserFeedItem, GroupedFeedItem } from '@models/feed.type'

const referenceWidth = 600
const referenceHeight = 958
const { width, height } = Dimensions.get('window')
const scaleWidth = width / referenceWidth
const scaleHeight = height / referenceHeight

const getDynamicValue = (value: number): number => {
	const scaledValue = Math.round(value * Math.min(scaleWidth, scaleHeight))
	return scaledValue
}

function getRandomItems<T>(items: T[]): T[] {
	// If the array has 3 or fewer items, return the array itself (or a copy of it).
	if (items.length <= 3) {
		return [...items]
	}

	const pickedItems: T[] = []
	const pickedIndexes: Set<number> = new Set()

	while (pickedItems.length < 3) {
		const randomIndex = Math.floor(Math.random() * items.length)
		// Ensure we only add unique items.
		if (!pickedIndexes.has(randomIndex)) {
			pickedItems.push(items[randomIndex])
			pickedIndexes.add(randomIndex)
		}
	}

	return pickedItems
}

const convertToTime = (number: number, showKeyword = true): string => {
	const hours = Math.floor(number / 3600)
	const minutes = Math.floor((number % 3600) / 60)
	const seconds = Math.floor(number % 60)
	let timeString = ''

	if (hours > 0) {
		timeString += `${hours}${showKeyword ? ' Hrs ' : ':'}`
	}
	if (minutes > 0) {
		timeString += `${minutes}${showKeyword ? ' Min ' : ':'}`
	}
	if (seconds > 0 || timeString === '') {
		timeString += `${seconds}${showKeyword ? ' Sec' : ''}`
	}
	if (timeString === '') {
		timeString = `0${showKeyword ? ' Sec' : ''}`
	}
	return timeString.trim()
}

function calculateElapsedPercentage(currentPage: number, totalPages: number) {
  if (totalPages <= 0) {
    return 0
  }
  
  const percentage = (currentPage / totalPages) * 100
  // Ensure percentage doesn't exceed 100
  return Math.min(percentage, 100)
}

function convertTime(timestampStr: string, use24hFormat: boolean = true): string {
  // Automatically detect the user's local timezone.
  const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = new Date(timestampStr)

  // Include year, month, and day along with time information.
  const options: Intl.DateTimeFormatOptions = {
    timeZone: targetTimezone,
    year: 'numeric',
    month: 'short',  // e.g., "Mar"
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24hFormat,
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function getNewAchievements(
  oldValue: number,
  newValue: number,
  thresholds: Achievement[]
): Achievement[] {
  return thresholds.filter(
    (a) => oldValue < a.threshold && newValue >= a.threshold
  )
}

function groupFeedItemsByBook(feedItems: UserFeedItem[]): GroupedFeedItem[] {
  const map = new Map<string, GroupedFeedItem>();

  for (const item of feedItems) {
    const bookId = item.book_id;
    const existing = map.get(bookId);

    const activity = {
      activity_type: item.activity_type,
      actors: item.actors,
      actor_ids: item.actor_ids,
			created_at: item.created_at,
			updated_at: item.updated_at,
      review: item.review,
    };

    if (existing) {
      existing.activities.push(activity);
    } else {
      map.set(bookId, {
        book: item.books,
        activities: [activity],
      });
    }
  }

  return Array.from(map.values());
}

export {
	getDynamicValue,
	getRandomItems,
	convertToTime,
	calculateElapsedPercentage,
	convertTime,
	getNewAchievements,
	groupFeedItemsByBook
}