import React, { useState, useCallback } from 'react'
import { View, SectionList, useColorScheme } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
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

	const sections = [
		{
			title: 'header',
			data: ['header'],
			renderItem: () => (
				<LeadProfileSection
					setModalProfileUpdateModal={setProfileupdateModalOpen}
					setModaTime={setTimeModalOpen}
					setModalAchievement={setAchievementModalOpen}
				/>
			),
		},
		{
			title: 'details',
			data: ['details'],
			renderItem: () => (
				<View style={tw`px-4 bg-transparent`}>
					<Names id={user as string} />
					<Bio id={user as string} />
				</View>
			),
		},
		{
			title: 'content',
			data: ['content'],
			renderItem: () => <SelectionPanel id={user as string} />,
		},
	]

	return (
		<View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
			<SectionList
				sections={sections}
				keyExtractor={(item, index) => item + index}
				renderItem={({ section }) => section.renderItem()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={tw`android:mt-32 ios:mt-24`}
				stickySectionHeadersEnabled={false}
			/>

			{/* Modals */}
			<ModalTime
				timeModalVisisble={isTimeModalOpen}
				setTimeModalVisible={setTimeModalOpen}
			/>
			<ModalProfile
				profileModalVisible={isProfileupdateModalOpen}
				setProfileModalVisible={setProfileupdateModalOpen}
			/>
			<ModalAchievements
				achievementsModalVisisble={isAchievementModalOpen}
				setAchievementsModalVisible={setAchievementModalOpen}
			/>
		</View>
	)
}

export default OtherUser