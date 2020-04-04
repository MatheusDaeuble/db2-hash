import React from 'react';
import { FlatList } from 'react-native';
import TupleItem, { BucketItem } from './Item';

const List = ({ tuples }) =>
  <FlatList
    data={tuples}
    initialNumToRender={20}
    keyExtractor={tuple => tuple.key.toString()}
    renderItem={({ item }) => <TupleItem item={item} />}
  />


const BucketList = ({ tuples }) =>
  <FlatList
    data={tuples}
    initialNumToRender={20}
    keyExtractor={(item, index) => {
      return index.toString()
    }}
    renderItem={({ item }) => <BucketItem item={item} />}
  />

export { BucketList }
export default List;
