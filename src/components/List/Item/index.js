import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'

const PageItem = ({ item, onSelect }) =>
  <TouchableOpacity
    style={styles.pageContainer}
    onPress={() => onSelect(item.value.key)}>
    <Text style={styles.pageText}>{'Página\n' + item.value.key}</Text>
  </TouchableOpacity>

const BucketItem = ({ item, onSelect }) =>
  <TouchableOpacity
    style={styles.pageContainer}
    onPress={() => onSelect(item.key)}>
    <Text style={styles.pageText}>
      {'Bucket\n' + item.key}
    </Text>
  </TouchableOpacity>

const TableItem = ({ item }) =>
  <View style={styles.pageContainer}>
    <Text style={styles.tableText}>
      {`${item.key} - ${item.value}`}
    </Text>
  </View>

export { BucketItem, TableItem }
export default PageItem;
