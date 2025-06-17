import { View, ScrollView, useColorScheme } from 'react-native'
import React, { useCallback, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import tw from '@utils/tailwind'
import ModalAchievements from '@components/PageComponents/profile/ModalAchievements'
import ModalProfile from '@components/PageComponents/profile/ModalProfile'
import ModalTime from '@components/PageComponents/profile/ModalTime'
import SelectionPanel from '@components/PageComponents/profile/SelectionPanel'
import LeadProfileSection from '@components/PageComponents/otherUser/LeadProfileSection'
import Names from '@components/PageComponents/otherUser/Names'
import Bio from '@components/PageComponents/otherUser/Bio'

const OtherUser = () => {
  const { user } = useLocalSearchParams()
  const theme = useColorScheme()
  const [isProfileupdateModalOpen, setProfileupdateModalOpen] = useState(false)
	const [isTimeModalOpen, setTimeModalOpen] = useState(false)
	const [isAchievementModalOpen, setAchievementModalOpen] = useState(false)

  // useFocusEffect(
  //   useCallback(() => {
  //   // Return function is invoked whenever the route gets out of focus.
  //   return () => {
  //     router.setParams({ user: undefined })
  //   }
  // }, []))

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
			<ScrollView style={tw``} showsVerticalScrollIndicator={false} contentContainerStyle={tw`android:mt-32 ios:mt-24`}>
			<LeadProfileSection setModalProfileUpdateModal={(bool) => setProfileupdateModalOpen(bool)} setModaTime={(bool) => setTimeModalOpen(bool)} setModalAchievement={(bool) => setAchievementModalOpen(bool)} />
				<View style={tw`px-4 bg-transparent`}>
					<Names id={user as string} />
					<Bio id={user as string} />
				</View>

				<SelectionPanel id={user as string} />
				<ModalTime timeModalVisisble={isTimeModalOpen} setTimeModalVisible={(bool) => setTimeModalOpen(bool)} />
				<ModalProfile profileModalVisible={isProfileupdateModalOpen} setProfileModalVisible={(bool) => setProfileupdateModalOpen(bool)} />
				<ModalAchievements achievementsModalVisisble={isAchievementModalOpen} setAchievementsModalVisible={(bool) => setAchievementModalOpen(bool)} />
			</ScrollView>
		</View>
  )
}

export default OtherUser