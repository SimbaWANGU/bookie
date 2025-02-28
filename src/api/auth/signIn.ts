import { FormData } from "@models/authform.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@utils/supabase"
import { router } from "expo-router"
import { Alert } from "react-native"
import { makeRedirectUri } from 'expo-auth-session'


const redirectTo = makeRedirectUri()

export const signUpWithEmailMutation = useMutation({
  mutationFn: async (formData: FormData) => {
    // await supabase.auth.signUp({
    //   email: formData.email,
    //   password: formData.password,
    //   options: {
    //     emailRedirectTo: redirectTo,
    //     data: {
    //       full_name: formData.fullName,
    //       user_name: formData.userName,
    //       // who: 'creator',
    //     }
    //   },
    // })
    console.log(formData, 'lol')
  },
  onSuccess: () => {
    const queryClient = useQueryClient()
    queryClient.invalidateQueries({
      queryKey: ['session'],
    })
    Alert.alert(
      'Signed In!',
      'Your session.',
      [
        {
          text: 'Ok',
          onPress: () => router.push('/'),
          style: 'cancel',
        },
      ],
    )
  },
  onError: (error) => {
    Alert.alert(error.message)
  },
})