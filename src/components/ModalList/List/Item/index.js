import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const TupleItem = ({item}) =>
  <Text style={styles.item}>{item.key + ' - ' + item.value}</Text>

const BucketItem = ({item}) =>
  <Text style={styles.item}>{`page: ${item.pageKey} | index: ${item.tuplaKey}`}</Text>

export { BucketItem }
export default TupleItem;
