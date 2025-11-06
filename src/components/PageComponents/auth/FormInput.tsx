import { SpaceMonoTextRegular } from '@components/styled/StyledText'
import tw from '@utils/tailwind'
import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'


const FormInput = ({ control, name, rules, ...inputProps }) => (
  <Controller
    control={control}
    name={name}
    defaultValue=""
    rules={{
      required: `${inputProps.placeholder} is required`,
      ...rules,
    }}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <>
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...inputProps}
        />
        {error && <SpaceMonoTextRegular style={tw`text-sm text-red-500`}>{error.message}</SpaceMonoTextRegular>}
      </>
    )}
  />
)

export default FormInput