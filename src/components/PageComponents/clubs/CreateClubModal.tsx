import React, { Dispatch, SetStateAction, useState } from 'react'
import { Modal, View } from 'react-native'
import { useForm } from 'react-hook-form'
import tw from '@utils/tailwind'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUserFollows from '@hooks/profile/useUserFollows'
import { useAtom } from 'jotai'
import { userAtom } from '@stores/user.state'
import { createClubWithInvites, inviteList } from '@api/users/api.inviteList'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import { fetchBooks } from '@api/books/api.books'
import { QueryKeys } from '@constants/QueryKeys'
import { Book } from '@models/book.type'
import { showCreateClubModalAtom } from '@stores/clubs.state'

export interface ClubFormData {
  name: string
  description?: string
  visibility: boolean
}

const CreateClubModal = () => {
  const [user] = useAtom(userAtom)
  const [visible, onAddNewClub] = useAtom(showCreateClubModalAtom)
  const [step, setStep] = useState(1)
  const queryClient = useQueryClient()
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedBook, setSelectedBook] = useState<string>()
  const { data: userFollows } = useUserFollows()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ClubFormData>({
    defaultValues: {
      name: '',
      description: '',
      visibility: false,
    }
  })

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const { data: usersList } = useQuery({
    queryKey: [QueryKeys.inviteUsers],
    queryFn: async () => await inviteList(userFollows!)
  })

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: [QueryKeys.featuredBooks],
    queryFn: fetchBooks,
  })

  const createClubWithInvitesMutation = useMutation({
    mutationFn: createClubWithInvites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.myClubs] })
    },
    onError: (err) => {
      console.error('Failed to create club with invites:', err)
    }
  })

  const onSubmit = async (data: ClubFormData) => {
    const payload = {
      name: data.name,
      description: data.description,
      visibility: data.visibility,
      invitedUserIds: selectedUsers,
      usersList: usersList!,
      currentUser: {
        id: user?.id as string,
        user_name: user?.user_name as string
      },
      selectedBookId: selectedBook as string
    }
  
    await createClubWithInvitesMutation.mutateAsync(payload)
  
    reset()
    setStep(1)
    setSelectedUsers([])
    onAddNewClub(false)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={tw`flex-1 justify-end items-center bg-black/50`}>
        <View style={tw`bg-white p-6 rounded-xl w-12/12 android:h-11/12 ios:h-9/10`}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <StepOne control={control} errors={errors} setStep={setStep} onAddNewClub={onAddNewClub} />
                );
              case 2:
                return (
                  <StepTwo usersList={usersList!} selectedUsers={selectedUsers} toggleUser={toggleUser} handleSubmit={handleSubmit} onSubmit={onSubmit} setStep={setStep} />
                );
              case 3:
                return (
                  <StepThree books={books} selectedBookId={selectedBook} setSelectedBookId={setSelectedBook} setStep={setStep} onSubmit={onSubmit} handleSubmit={handleSubmit} />
                );
              default:
                return null;
            }
          })()}
        </View>
      </View>
    </Modal>
  )
}

export default CreateClubModal