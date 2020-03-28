import React from 'react';
import { Text,  TouchableOpacity } from 'react-native';
import styles from './styles'

const PageItem = ({item, onSelect}) => 
  <TouchableOpacity 
    style={styles.pageContainer}
    onPress={()=> onSelect(item.value.key)}> 
    <Text style={styles.pageText}>{'Página\n' + item.value.key}</Text>
  </TouchableOpacity>

export default PageItem;
