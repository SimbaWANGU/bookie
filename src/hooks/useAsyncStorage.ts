import AsyncStorage from '@react-native-async-storage/async-storage'
import useFirstTimeOnApp from './useFirstTimeOnApp'

const useAsyncStorage = (): [(data: unknown, key: string) => Promise<void>, (key: string) => Promise<void>, (key: string) => Promise<void>] => {
	const [, setFirstTimeOnApp] = useFirstTimeOnApp()

	const storeData = async (data: unknown, key: string): Promise<void> => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(data))
		} catch (error) {
			console.log(error)
		}
	}

	const retrieveData = async (key: string): Promise<void> => {
		try {
			const value = await AsyncStorage.getItem(key)
			if (value !== null) {
				switch (key) {
				case 'firstTimeOnApp':
					console.log(JSON.parse(value) as boolean)
					setFirstTimeOnApp(JSON.parse(value) as boolean)
					break
				default:
					break
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const deleteData = async (key: string): Promise<void> => {
		void AsyncStorage.removeItem(key)
	}

	return [storeData, retrieveData, deleteData]
}

export default useAsyncStorage
