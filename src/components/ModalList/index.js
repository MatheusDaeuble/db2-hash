import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import List from './List'

const ModalList = ({tuples, close, pageKey}) =>
  <Modal
    visible={true}
    transparent={true}
    animationType={'slide'}
    onRequestClose={close}>
    <View style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeContainer} onPress={close}>
          <Text style={styles.close}>x</Text>
        </TouchableOpacity>
        <Text style={styles.page}>Page: {pageKey}</Text>
        <List tuples={tuples}/>
      </View>
    </View>
  </Modal>

export default ModalList;