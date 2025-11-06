import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import tw from '@utils/tailwind'
import { ClubFormData } from './CreateClubModal'
import { UseFormHandleSubmit } from 'react-hook-form'
import { LegendList, LegendListRef } from '@legendapp/list'

interface StepTwoProps {
  usersList: { id: string; avatar_url: string; expo_push_token: string; user_name: string }[]
  selectedUsers: string[]
  toggleUser: (userId: string) => void
  handleSubmit: UseFormHandleSubmit<ClubFormData, undefined>
  onSubmit: (data: ClubFormData) => Promise<void>
  setStep: Dispatch<SetStateAction<number>>
}

const StepTwo: React.FC<StepTwoProps> = ({ usersList, selectedUsers, toggleUser, setStep }) => {
  const listRef = useRef<LegendListRef | null>(null)

  return (
    <>
      <Text style={tw`text-xl font-bold mb-4`}>Step 2: Invite Members</Text>
      <LegendList
        ref={listRef}
        data={usersList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const selected = selectedUsers.includes(item.id)
          return (
            <TouchableOpacity
              onPress={() => toggleUser(item.id)}
              style={tw`flex-row justify-between items-center p-3 border-b`}
              activeOpacity={.8}
            >
              <View style={tw`flex flex-row items-center gap-2`}>
                <Image source={{ uri: item.avatar_url }} style={tw`h-10 rounded-full aspect-square`}  />
                <Text>{item.user_name}</Text>
              </View>
              <Text style={tw`${selected ? 'text-green-500' : 'text-gray-400'}`}>
                {selected ? '✓ Invited' : 'Tap to Invite'}
              </Text>
            </TouchableOpacity>
          )
        }}
      />

      <TouchableOpacity
        style={tw`bg-accent/85 p-3 rounded-full mt-4`}
        onPress={() => setStep(3)}
        activeOpacity={.8}
      >
        <Text style={tw`text-white text-center`}>Next: Select Book</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setStep(1)}>
        <Text style={tw`text-center text-blue-500 mt-4`}>← Back</Text>
      </TouchableOpacity>
    </>
  )
}

export default StepTwo