import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';

const Menu = ({options, styleContainer={}, styleOption={}}) => {

  const renderOption = (option, isLast) => 
    <>
      <TouchableOpacity  style={[styles.itemContainer, styleOption ]} onPress={option.onPress}>
        <Text style={[styles.item, option.isSelected && {fontWeight:'bold'}]}>{option.title}</Text>
      </TouchableOpacity>
      { !isLast && <View style={[styles.line]}/> }
    </>

  return (
    <View style={[styles.container, styleContainer]}>
      <FlatList
        data={options}
        keyExtractor={option => option.title}
        numColumns={options.length}
        columnWrapperStyle={{justifyContent:'center'}}
        scrollEnabled={false}
        renderItem={({item , index}) => renderOption(item, index+1===options.length) }
      />
    </View>
  ) ;
};

export default Menu;
