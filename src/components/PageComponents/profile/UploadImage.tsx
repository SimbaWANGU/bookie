import React from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import tw from '@utils/tailwind'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { uploadAvatar } from '@api/profile/api.user'
import { getDynamicValue } from '@constants/Functions'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'

const UploadAvatar = () => {
  const [user] = useAtom(userAtom)
  const queryClient = useQueryClient()

  const mutation = useMutation({
		mutationKey: ['profile-image-upload'],
		mutationFn: uploadAvatar,
		onSuccess: () => {
			queryClient.invalidateQueries({
        queryKey: ['get-user']
      })
			Alert.alert(
				'Profile Picture',
        'Successfully Updated',
        [
          {
            text: 'Ok',
            // onPress: () => router.push('/'),
            style: 'cancel',
          },
        ],
			)
		},
		onError: (error) => {
			Alert.alert(
				'Profile Picture',
        error.message,
        [
          {
            text: 'Ok',
            // onPress: () => router.push('/'),
            style: 'cancel',
          },
        ],
			)
		}
	})

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (result.canceled) return

      const asset = result.assets[0]
      const base64 = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // Determine file extension and content type.
      const extension = asset.uri.split('.').pop()
      const contentType = `image/${extension}`
      // Use a consistent file path so that the new image overwrites the old one.
      const filePath = `avatars/${user?.id}.${extension}`

      mutation.mutate({ filePath, base64, contentType, userId: user?.id as string })
    } catch (error: any) {
      console.error('Error picking image:', error)
      Alert.alert(
				'Error Picking Image',
        'Try again later',
        [
          {
            text: 'Ok',
            // onPress: () => router.push('/'),
            style: 'cancel',
          },
        ],
			)
    }
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={.8}
        style={[tw`my-2 relative`, { height: getDynamicValue(250) }]}
        onPress={pickImage}
      >
        <Image
          source={{
            uri:
              user?.avatar_url ||
              'https://cdn2.iconfinder.com/data/icons/business-hr-and-recruitment/100/account_blank_face_dummy_human_mannequin_profile_user_-512.png',
          }}
          style={tw`h-full aspect-square rounded-full self-center`}
        />
        {/* Overlay to indicate clickable action */}
        <LinearGradient
          colors={['transparent', '#00000077', 'black']}
          locations={[0.1, 0.7, 0.9]}
          style={tw`h-full aspect-square absolute self-center rounded-full justify-center items-center`}
        >
          <MaterialCommunityIcons name="image-edit-outline" style={tw`absolute bottom-0 text-white font-bold text-4xl`} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={tw`text-center text-base text-gray-400 my-1`}>Update your profile picture</Text>
    </>
  )
}

export default UploadAvatar