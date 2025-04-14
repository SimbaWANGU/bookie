import { useCallback, useEffect, useRef } from 'react'

const useTimeout = (callback: () => void | Promise<void>, delay: number): [() => void, () => void] => {
	const callbackRef = useRef(callback)
	const timeoutRef = useRef<NodeJS.Timeout>()

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			void callbackRef.current()
		}, delay)
	}, [delay])

	const clear = useCallback(() => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current)
		}
	}, [])

	useEffect(() => {
		set()
		return clear
	}, [delay, set, clear])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	return [reset, clear]
}

export default useTimeout
