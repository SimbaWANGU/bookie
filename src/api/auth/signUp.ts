import { useMutation } from "@tanstack/react-query"
import { supabase } from "@utils/supabase"
import { router } from "expo-router"
import { Alert } from "react-native"

const signInWithEmailMutation = useMutation({
  mutationFn: async () => {
    await supabase.auth.signInWithPassword({ email, password })
  },
  onSuccess: () => {
    setLoading(false)
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
    setLoading(false)
    Alert.alert(error.message)
  },
})