import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles'
import PageItem from './Item'

const List = ({pages, onSelect}) =>
  <View style={styles.listContainer}>
    <FlatList
      data={pages}
      initialNumToRender={20}
      style={styles.list}
      keyExtractor={(page) => page.key.toString()}
      renderItem={({item}) =>  <PageItem item={item} onSelect={onSelect} /> }
      numColumns={3}
      columnWrapperStyle={styles.columns}
    />
  </View>

export default List;
