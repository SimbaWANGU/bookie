import { View, Text, Modal } from 'react-native'
import React from 'react'
import Reviewsheader from '@components/headers/modalsHeader'
import tw from '@utils/tailwind'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface ModalTimeProps {
  timeModalVisisble: boolean
  setTimeModalVisible: (bool: boolean) => void
}

const ModalTime: React.FC<ModalTimeProps> = ({ timeModalVisisble, setTimeModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      visible={timeModalVisisble}
      onRequestClose={() => setTimeModalVisible(false)}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={tw`p-4 pb-32`} // Extra bottom padding for the fixed input box
        enableOnAndroid={true}
      >

        <Reviewsheader setModalVisible={setTimeModalVisible} title={'My Reading Stats'} />
        
      </KeyboardAwareScrollView>
      
    </Modal>
  )
}

export default ModalTime