import { View, Text, Switch, TextInput, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import tw from '@utils/tailwind'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { ClubFormData } from './CreateClubModal'

interface StepOneProps {
  control: Control<ClubFormData, any>
  errors: FieldErrors<ClubFormData>
  setStep: Dispatch<SetStateAction<number>>
  onAddNewClub: Dispatch<SetStateAction<boolean>>
}

const StepOne: React.FC<StepOneProps> = ({ control, errors, setStep, onAddNewClub }) => {
  return (
    <>
      <Text style={tw`text-xl font-bold mb-4`}>Step 1: Club Info</Text>

      <Text style={tw`mb-1 text-base`}>Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={tw`border rounded p-2 mb-2`}
            placeholder="e.g. The Night Owls"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={tw`text-red-500 mb-2`}>Name is required.</Text>}

      <Text style={tw`mb-1 text-base`}>Description{' '}
        <Text>
          (optional)
        </Text>
      </Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={tw`border rounded p-2 mb-4`}
            placeholder="Tell people what this club is about..."
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      <View style={tw`flex-row items-center justify-between mb-6`}>
        <Text style={tw`mb-1 text-base`}>Make club public</Text>
        <Controller
          control={control}
          name="visibility"
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={tw`bg-accent p-3 rounded-full mb-2`}
        onPress={() => setStep(2)}
        activeOpacity={.8}
      >
        <Text style={tw`text-white text-center text-base`}>Next: Invite Members</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onAddNewClub(false)}
        activeOpacity={.8}
      >
        <Text style={tw`text-center text-red-500 mt-4`}>Cancel</Text>
      </TouchableOpacity>
    </>
  )
}

export default StepOne