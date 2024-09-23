import { Dimensions } from 'react-native'

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

export {
	getDynamicValue,
	getRandomItems,
	convertToTime
}