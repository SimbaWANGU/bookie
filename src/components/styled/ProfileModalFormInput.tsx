import tw from '@utils/tailwind'
import { Controller } from 'react-hook-form'
import { View, TextInput, Text } from 'react-native'

interface ProfileForm {
  name: string;
  userName: string;
  bio: string;
}

// A reusable form input component
interface FormInputProps {
  label: string;
  control: any;
  name: keyof ProfileForm;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const FormInput: React.FC<FormInputProps> = ({ label, control, name, placeholder, multiline = false, numberOfLines }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-lg font-bold mb-2`}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={tw`border border-gray-300 rounded p-2`}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      )}
    />
  </View>
)

export default FormInput