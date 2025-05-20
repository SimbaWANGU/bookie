import React from 'react'
import { getDynamicValue } from '@constants/Functions'
import { ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import tw from '@utils/tailwind'

const UsersProfileHeader = () => {
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
				
			</LinearGradient>
    </ImageBackground>
	)
}

export default UsersProfileHeader