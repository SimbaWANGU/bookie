import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import Logo from '@assets/images/bookworms-logo.png'
import tw from '@utils/tailwind'
import { useForm } from 'react-hook-form'
import FormInput from '@components/PageComponents/auth/FormInput'
import SocialLogins from '@components/PageComponents/auth/SocialLogins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { supabase } from '@utils/supabase'
import { makeRedirectUri } from 'expo-auth-session'
import { FormData } from '@models/authform.type'
import { QueryKeys } from '@constants/QueryKeys'
import { useAtom } from 'jotai'
import { bookPreferencesAtom } from '@stores/preference.state'

const redirectTo = makeRedirectUri()

const AuthScreen = () => {
  const queryClient = useQueryClient()
  const [bookPreferences] = useAtom(bookPreferencesAtom)
  const [isSignUp, setIsSignUp] = useState(false)
  const { control, handleSubmit } = useForm()


  const signUpWithEmailMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: formData.fullName,
            user_name: formData.userName,
          },
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.session] })
      Alert.alert(
        'Signed In!',
        'Your session.',
        [
          {
            text: 'Ok',
            onPress: () => router.push('/auth/choose'),
            style: 'cancel',
          },
        ],
      )
    },
    onError: (error) => {
      Alert.alert(error.message)
    },
    retry: 3
  })

  const signInWithEmailMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.session] })
      Alert.alert(
        'Signed In!',
        'Your session.',
        [
          {
            text: 'Ok',
            onPress: () => router.push(bookPreferences.length === 0 ? '/auth/choose' : '/'),
            style: 'cancel',
          },
        ],
      )
    },
    onError: (error) => {
      Alert.alert(error.message)
    },
  })

  const onSubmit = (data) => {
    if (isSignUp) {
      signUpWithEmailMutation.mutate(data)
    } else {
      signInWithEmailMutation.mutate(data)
    }
  }

  // Combine the loading states from both mutations.
  const isLoading = signUpWithEmailMutation.isPending || signInWithEmailMutation.isPending

  return (
    <View style={tw`flex-1 items-center justify-center px-6 bg-primary-color`}>
      <Image
        source={Logo}
        style={tw`aspect-square ios:h-24 android:h-30 rounded-full`}
      />
      <Text style={tw`text-3xl text-center mb-8`}>
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </Text>

      {isSignUp && (
        <FormInput
          control={control}
          name="fullName"
          placeholder="Full Name"
          style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
          rules={undefined}
        />
      )}

      <FormInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
        rules={undefined}
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
        style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
        rules={undefined}
      />

      <TouchableOpacity
        style={tw`bg-accent btn-primary`}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <Text style={tw`text-center text-gray-500 mb-4`}>or continue with</Text>
      <SocialLogins />

      <TouchableOpacity style={tw`mb-2`} onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={tw`text-center text-accent`}>
          {isSignUp
            ? 'Already have an account? Sign In'
            : 'Don\'t have an account? Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* //?  add forgot password functionality */}
      <TouchableOpacity style={tw``} onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={tw`text-center text-accent`}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Render a modal overlay with an ActivityIndicator while loading */}
      {isLoading && (
        <Modal transparent={true} animationType="none">
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
    color: '#000',
  },
})

export default AuthScreen