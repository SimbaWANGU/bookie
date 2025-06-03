import { View, Modal, Text, Pressable, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import SearchBox from '@components/PageComponents/clubs/SearchBox'
import ClubsList from '@components/PageComponents/clubs/ClubsList'
import AddNewClub from '@components/PageComponents/clubs/AddNewClub'
import tw from '@utils/tailwind'
import CreateClubModal from '@components/PageComponents/clubs/CreateClubModal'

const ClubsScreen = () => {
  const theme = useColorScheme()
  const [showClubDetailsModal, setShowClubDetailsModal] = useState(false)
  const [showCreateClubModal, setShowCreateClubModal] = useState(false)

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SearchBox />
      <ClubsList onOpenClub={setShowClubDetailsModal} />
      <AddNewClub onAddNewClub={setShowCreateClubModal} />

      {/* Club Details Modal */}
      <Modal visible={showClubDetailsModal} animationType="slide" transparent>
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-11/12`}>
            <Text style={tw`text-xl font-bold mb-4`}>Club Details</Text>
            <Pressable onPress={() => setShowClubDetailsModal(false)}>
              <Text style={tw`text-blue-500 text-center mt-4`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Create Club Modal */}
      <CreateClubModal visible={showCreateClubModal} onAddNewClub={setShowCreateClubModal} />
    </View>
  )
}

export default ClubsScreen