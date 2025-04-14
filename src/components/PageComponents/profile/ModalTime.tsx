import { Modal } from 'react-native'
import React from 'react'
import Reviewsheader from '@components/headers/modalsHeader'
import tw from '@utils/tailwind'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CumulativeReadingTime from './CumulativeReadingTime'
import CompletedBookReadingTime from './CompletedBookReadingTime'

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
      <KeyboardAwareScrollView contentContainerStyle={tw`p-4 pb-32`} enableOnAndroid={true}>

        <Reviewsheader setModalVisible={setTimeModalVisible} title={'My Reading Stats'} />
        <CumulativeReadingTime />
        <CompletedBookReadingTime />
        
      </KeyboardAwareScrollView>
      
    </Modal>
  )
}

export default ModalTime