import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Logo from '@assets/images/bookworms-logo.png'
import tw from '@utils/tailwind'
import { supabase } from '@utils/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false)
	const queryClient = useQueryClient()
	const signInWithEmailMutation = useMutation({
		mutationFn: async () => {
			await supabase.auth.signInWithPassword({
				email: 'simba@email.com',
				password: 'pass'
			})
		},
		onSuccess: () => {
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
        <TextInput
          placeholder="Full Name"
          style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
        />
      )}
      
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={tw`border border-gray-300 w-3/4 p-4 rounded-lg mb-4`}
      />
      
      <TouchableOpacity
        style={tw`bg-accent btn-primary`}
				activeOpacity={.8}
				onPress={async () => {
					if (isSignUp) {
						// signInWithEmailMutation.mutate()
						const { data , error } = await supabase.auth.signInWithPassword({
							email: 'simba@email.com',
							password: 'pass'
						})
						console.log(data, error)
					} else {
						const { data , error } = await supabase.auth.signInWithPassword({
							email: 'simba@email.com',
							password: 'pass'
						})
						console.log(data, error)
					}
				}}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Text>
      </TouchableOpacity>
      
      <Text style={tw`text-center text-gray-500 mb-4`}>or continue with</Text>
      
      <View style={tw`flex-row justify-center mb-4`}> 
        <TouchableOpacity style={tw`p-3 mx-2 border border-gray-300 rounded-full`}>
					<Ionicons name="logo-google" size={24} color="red" />
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`p-3 mx-2 border border-gray-300 rounded-full`}>
          <Ionicons name="logo-apple" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={tw`text-center text-accent`}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthScreen
