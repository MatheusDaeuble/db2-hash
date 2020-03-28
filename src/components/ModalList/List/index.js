import React from 'react';
import { FlatList } from 'react-native';
import TupleItem from './Item';

const List = ({ tuples }) => 
  <FlatList
    data={tuples}
    initialNumToRender={20}
    keyExtractor={tuple => tuple.key.toString()}
    renderItem={ ({item}) => <TupleItem item={item}/> }
  />

export default List;