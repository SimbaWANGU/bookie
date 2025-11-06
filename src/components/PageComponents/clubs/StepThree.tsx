import React, { Dispatch, SetStateAction, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from '@utils/tailwind'
import { Image } from 'expo-image'
import { Book } from '@models/book.type'
import { ClubFormData } from './CreateClubModal'
import { UseFormHandleSubmit } from 'react-hook-form'
import { LegendList, LegendListRef } from '@legendapp/list'

interface StepThreeProps {
  books: Book[]
  selectedBookId: string | undefined
  setSelectedBookId: Dispatch<SetStateAction<string | undefined>>
  onSubmit: (data: ClubFormData) => Promise<void>
  handleSubmit: UseFormHandleSubmit<ClubFormData, undefined>
  setStep: (step: number) => void
}

const StepThree: React.FC<StepThreeProps> = ({ books, selectedBookId, setSelectedBookId, onSubmit, setStep, handleSubmit }) => {
  const listRef = useRef<LegendListRef | null>(null)

  return (
    <View style={tw`flex-1`}>
      <Text style={tw`text-xl font-bold mb-4`}>Optional: Select a Book</Text>

      <LegendList
        ref={listRef}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedBookId(selectedBookId === item.id ? undefined : item.id)}
            style={tw`flex-row items-center mb-2 p-2 rounded-lg ${selectedBookId === item.id ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            {item.cover_image_url && (
              <Image source={{ uri: item.cover_image_url }} style={tw`w-10 h-14 rounded mr-2`} contentFit="cover" />
            )}
            <Text style={tw`text-base`}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity onPress={() => setStep(2)} style={tw`px-4 py-2 rounded-full bg-gray-200`}>
          <Text style={tw`text-gray-800 text-base`}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`px-4 py-2 rounded-full bg-blue-500`}>
          <Text style={tw`text-white text-base`}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StepThree