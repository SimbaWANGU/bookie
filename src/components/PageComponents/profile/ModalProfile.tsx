import React, { useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import tw from '@utils/tailwind'
import Reviewsheader from '@components/headers/modalsHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UploadImage from './UploadImage'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { useForm } from 'react-hook-form'
import FormInput from '@components/styled/ProfileModalFormInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomUser } from '@models/userProfile.type'
import { updateProfile } from '@api/profile/api.user'

interface ModalProfileProps {
  profileModalVisible: boolean;
  setProfileModalVisible: (visible: boolean) => void;
}

interface ProfileForm {
  name: string;
  userName: string;
  bio: string;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ profileModalVisible, setProfileModalVisible }) => {
  const [user, setUser] = useAtom(userAtom)
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset, watch } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      userName: user?.user_name || '',
      bio: user?.bio || '',
    },
  })

  // When the user object changes, update the form values.
  useEffect(() => {
    reset({
      name: user?.name || '',
      userName: user?.user_name || '',
      bio: user?.bio || '',
    })
  }, [user, reset])
  
  const profileMutation = useMutation({
    mutationKey: ['update-profile-details'],
    mutationFn: updateProfile,
    onSuccess: async (data: CustomUser[]) => {
      // Assuming data returns an array with one updated user record.
      const updatedUser = data[0]
      setUser((prev) => (prev ? { ...prev, ...updatedUser } : updatedUser))
      await queryClient.refetchQueries({ queryKey: ['get-user'] })
      Alert.alert('Profile Updated', 'Your profile details have been updated successfully.')
      setProfileModalVisible(false)
    },
    onError: (error: any) =>  Alert.alert('Error Updating Profile', error.message || 'An error occurred'),
  })
  
  // In your onSubmit handler:
  const onSubmit = (formData: ProfileForm) => {
    const updateData: Partial<{ name: string; user_name: string; bio: string }> = {}
  
    if (formData.name !== user?.name) {
      updateData.name = formData.name
    }
    if (formData.userName !== user?.user_name) {
      updateData.user_name = formData.userName
    }
    if (formData.bio !== user?.bio) {
      updateData.bio = formData.bio
    }
  
    if (Object.keys(updateData).length > 0 && user?.id) {
      profileMutation.mutate({ id: user.id, updateData })
    } else {
      setProfileModalVisible(false)
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={profileModalVisible}
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={tw`p-4 pb-32`}
        enableOnAndroid={true}
      >
        <Reviewsheader setModalVisible={setProfileModalVisible} title={'Profile Update'} />
        <UploadImage />
        <View style={tw`mt-4`}>
          <FormInput
            label="Name"
            control={control}
            name="name"
            placeholder="Enter your name"
          />
          <FormInput
            label="User Name"
            control={control}
            name="userName"
            placeholder="Enter your username"
          />
          <FormInput
            label="Bio"
            control={control}
            name="bio"
            placeholder="Write something about yourself"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={tw`bg-accent py-3 rounded-lg items-center`}
          >
            <Text style={tw`text-white text-lg font-bold`}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  )
}

export default ModalProfile