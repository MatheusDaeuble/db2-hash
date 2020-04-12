import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles'
import PageItem, { BucketItem, TableItem } from './Item'

const List = ({ data, onSelect, typeData }) =>
  <View style={styles.listContainer}>
    <FlatList
      data={data}
      initialNumToRender={20}
      style={styles.list}
      keyExtractor={(data) => data.key.toString()}
      renderItem={({ item }) => (
        <>
          {
            (() => {
              switch (typeData) {
                case 'buckets':
                  return <BucketItem item={item} onSelect={onSelect} />
                case 'pages':
                  return <PageItem item={item} onSelect={onSelect} />
                case 'table':
                  return <TableItem item={item} onSelect={onSelect} />
                case 'overflows':
                  return <BucketItem item={item} onSelect={onSelect} />
                default:
                  return ''
              }
            })()
          }
        </>
      )}
      numColumns={3}
    />
  </View>

const TableList = ({ data, onSelect, typeData }) =>
  <View style={styles.listContainer}>
    <FlatList
      data={data}
      initialNumToRender={20}
      style={styles.list}
      keyExtractor={(data) => data.key.toString()}
      renderItem={({ item }) => <TableItem item={item} />}
      numColumns={1}
    />
  </View>

export { TableList }
export default List;
