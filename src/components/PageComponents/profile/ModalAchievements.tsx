import { Modal } from 'react-native'
import React from 'react'
import Reviewsheader from '@components/headers/modalsHeader'
import tw from '@utils/tailwind'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface AchievementsProps {
  achievementsModalVisisble: boolean
  setAchievementsModalVisible: (bool: boolean) => void
}

const ModalAchievements: React.FC<AchievementsProps> = ({ achievementsModalVisisble, setAchievementsModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      visible={achievementsModalVisisble}
      onRequestClose={() => setAchievementsModalVisible(false)}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={tw`p-4 pb-32`} // Extra bottom padding for the fixed input box
        enableOnAndroid={true}
      >

        <Reviewsheader setModalVisible={setAchievementsModalVisible} title={'Achievements'} />
      </KeyboardAwareScrollView>
    </Modal>
  )
}

export default ModalAchievements