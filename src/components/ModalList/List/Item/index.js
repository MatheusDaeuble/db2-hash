import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const TupleItem = ({item}) =>
  <Text style={styles.item}>{item.key + ' - ' + item.value}</Text>

const BucketItem = ({item}) =>
  <Text style={styles.item}>{TODO}</Text>

export { BucketItem }
export default TupleItem;
