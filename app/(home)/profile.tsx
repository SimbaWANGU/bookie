import React, { useState } from 'react'
import { View } from '@components/styled/Themed'
import { useColorScheme } from 'react-native'
import LeadProfileSection from '@components/PageComponents/profile/LeadProfileSection'
import tw from '@utils/tailwind'
import { ScrollView } from 'react-native-gesture-handler'
import Names from '@components/PageComponents/profile/Names'
import Bio from '@components/PageComponents/profile/Bio'
import SelectionPanel from '@components/PageComponents/profile/SelectionPanel'
import ModalTime from '@components/PageComponents/profile/ModalTime'
import ModalProfile from '@components/PageComponents/profile/ModalProfile'
import ModalAchievements from '@components/PageComponents/profile/ModalAchievements'

const Profile = () => {
	const theme = useColorScheme()
	const [isProfileupdateModalOpen, setProfileupdateModalOpen] = useState(false)
	const [isTimeModalOpen, setTimeModalOpen] = useState(false)
	const [isAchievementModalOpen, setAchievementModalOpen] = useState(false)

	return (
		<View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
			<ScrollView style={tw``} contentContainerStyle={tw``}>
			<LeadProfileSection setModalProfileUpdateModal={(bool) => setProfileupdateModalOpen(bool)} setModaTime={(bool) => setTimeModalOpen(bool)} setModalAchievement={(bool) => setAchievementModalOpen(bool)} />
				<View style={tw`px-4 bg-transparent`}>
					<Names />
					<Bio />
				</View>

				<SelectionPanel />
				<ModalTime timeModalVisisble={isTimeModalOpen} setTimeModalVisible={(bool) => setTimeModalOpen(bool)} />
				<ModalProfile profileModalVisible={isProfileupdateModalOpen} setProfileModalVisible={(bool) => setProfileupdateModalOpen(bool)} />
				<ModalAchievements achievementsModalVisisble={isAchievementModalOpen} setAchievementsModalVisible={(bool) => setAchievementModalOpen(bool)} />
			</ScrollView>
		</View>
	)
}

export default Profile
