import React from 'react'
import { getDynamicValue } from '@constants/Functions'
import tw from 'twrnc'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'

const ProfileHeader = () => {
  return (
    <ImageBackground
      style={[
        tw`flex w-full flex-row px-4 bg-accent`,
        { height: getDynamicValue(150) }
      ]}
      source={{ uri: 'https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2Fabstract_art_Compressed_638250928944386407.jpg&w=1920&q=75' }}
    >	
      <LinearGradient
        colors={['#00000088', 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={tw`w-full h-full absolute rounded items-start justify-center`}
        locations={[0, 1]}
      >
				<TouchableOpacity
					style={tw`p-2 mr-4`}
        	onPress={() => router.back()}
				>
        <FontAwesome6 name={'arrow-left'} style={tw`text-2xl right-4 top-2 p-7 back-icon text-white`} />
      </TouchableOpacity>
			</LinearGradient>
    </ImageBackground>
  )
}

export default ProfileHeader