import { QuickSandTextRegular } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import React, { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity } from 'react-native'

interface AddNewClubProps {
  onAddNewClub: Dispatch<SetStateAction<boolean>>
}

const AddNewClub: React.FC<AddNewClubProps> = ({ onAddNewClub }) => {
  return (
    <TouchableOpacity
      style={tw`absolute bottom-0 h-12 rounded-full w-auto px-8 bg-accent/85 items-center justify-center self-center my-2`}
      activeOpacity={.8}
      onPress={() => onAddNewClub(true)}
    >
      <QuickSandTextRegular style={tw`text-lg text-light`}>Create Club</QuickSandTextRegular>
    </TouchableOpacity>
  )
}

export default AddNewClub