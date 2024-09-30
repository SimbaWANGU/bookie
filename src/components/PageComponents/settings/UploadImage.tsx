import { Alert, Pressable } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { supabase } from '@utils/supabase'
import Toast from 'react-native-toast-message'
import useUser from '@hooks/useUser'
import { getDynamicValue } from '@constants/Functions'
import ProfilePicture from '@components/PageComponents/profile/ProfilePicture'
import tw from 'twrnc'

const UploadImage = () => {
	const [user] = useUser()
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (result.canceled) {
			return
		}

		const img = result.assets[0]
		const base64 = await FileSystem.readAsStringAsync(img.uri, {
			encoding: 'base64',
		})
		const contentType = `image/${img.uri.split('.').pop()}`
		const filePath = `${user!.id}/pp`
    
		try {
			await supabase.storage.from('avatars').upload(filePath, decode(base64), {contentType})
			Toast.show({
				type: 'success',
				text1: 'Avatar updated!',
				text1Style: {
					fontSize: getDynamicValue(20),
					fontWeight: 'bold',
				},
				text2: 'Your avatar has been updated successfully!',
				text2Style: {
					fontSize: getDynamicValue(16),
				}
			})
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error updating avatar!',
				text1Style: {
					fontSize: getDynamicValue(20),
					fontWeight: 'bold',
				},
				text2: 'An error occurred while updating your avatar!',
				text2Style: {
					fontSize: getDynamicValue(16),
				}
			})
			// Sentry.Native.captureMessage('Error returned from uploading avatar')
			// Sentry.Native.captureException(error)
		}
	}

	return (
		<Pressable
			style={tw`h-1/4`}
			onPress={pickImage}
		>
			<ProfilePicture />
		</Pressable>
	)
}

export default UploadImage