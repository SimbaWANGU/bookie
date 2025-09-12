import React, { useState } from 'react'
import { SectionList, useColorScheme } from 'react-native'
import { View } from '@components/styled/Themed'
import tw from '@utils/tailwind'
import LeadProfileSection from '@components/PageComponents/profile/LeadProfileSection'
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
					<Names />
					<Bio />
				</View>
			),
		},
		{
			title: 'content',
			data: ['content'],
			renderItem: () => <SelectionPanel />,
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

export default Profile