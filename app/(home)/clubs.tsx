import { View, useColorScheme } from 'react-native'
import React from 'react'
import SearchBox from '@components/PageComponents/clubs/SearchBox'
import ClubsList from '@components/PageComponents/clubs/ClubsList'
import tw from '@utils/tailwind'
import CreateClubModal from '@components/PageComponents/clubs/CreateClubModal'
import ClubDetailsModal from '@components/PageComponents/clubs/ClubDetailsModal'

const ClubsScreen = () => {
  const theme = useColorScheme()

  return (
    <View style={tw`flex-1 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <SearchBox />
      <ClubsList />

      {/* Club Details Modal */}
      <ClubDetailsModal />

      {/* Create Club Modal */}
      <CreateClubModal />
    </View>
  )
}

export default ClubsScreen