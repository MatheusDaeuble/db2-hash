import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const TupleItem = ({item}) =>
  <Text style={styles.item}>{item.key + ' - ' + item.value}</Text>

const BucketItem = ({item}) =>
  <Text style={styles.item}>{`Tupla: ${item.tuplaKey} -> Página: ${item.pageKey}  `}</Text>

export { BucketItem }
export default TupleItem;
