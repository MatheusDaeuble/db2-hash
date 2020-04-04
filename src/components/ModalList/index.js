import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import List, { BucketList } from './List'

const ModalList = ({ tuples, close, key, whichData }) =>
  <Modal
    visible={true}
    transparent={true}
    animationType={'slide'}
    onRequestClose={close}>
    <View style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeContainer} onPress={close}>
          <Text style={styles.close}>x</Text>
          {console.log(tuples)}
        </TouchableOpacity>
        {
          (() => {
            switch (whichData) {
              case 'buckets':
                return <>
                  <Text style={styles.page}>Bucket: {key}</Text>
                  <BucketList tuples={tuples} />
                </>
                break;
              case 'pages':
                return <>
                  <Text style={styles.page}>Page: {key}</Text>
                  <List tuples={tuples} />
                </>
              default:
                break;
            }
          })()
        }
      </View>
    </View>
  </Modal>

export default ModalList;
