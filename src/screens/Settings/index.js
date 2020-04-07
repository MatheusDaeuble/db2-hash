import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
const image = 'https://cdn.iconscout.com/icon/free/png-256/settings-gear-mechanics-preferences-option-config-configuration-23369.png'
import { SETTINGS } from '../../enums';
import { dataSize } from '../../utils/readFile';
import Menu from '../../components/Menu';

const SIZE = dataSize()

const Settings = ({navigation}) => {

  const [type, setType] = useState('Quantidade')
  const [pageInput, setPageInput] = useState('200')
  const [hashInput, setHashInput] = useState('1009')
  const [bucketInput, setBucketInput] = useState('200')

  const doSimulator = () => {
    if (pageInput && hashInput && bucketInput) {
      const need = parseInt(SIZE/parseInt(pageInput))
      const settings = {
        [SETTINGS.HASH_NUMBER]: parseInt(hashInput),
        [SETTINGS.PAGE_SIZE]: parseInt(type === 'Quantidade' ? need : pageInput),
        [SETTINGS.NUMBER_MAX_PAGES]: parseInt(type === 'Quantidade' ? pageInput : need),
        [SETTINGS.BUCKET_SIZE]: parseInt(bucketInput),
      }
      navigation.navigate('Simulador', {settings})
    }
  }


  return (
    <ImageBackground
      source={{uri: image}}
      imageStyle={styles.image}
      resizeMode={'repeat'}
      style={styles.background} >

      <Menu
      styleContainer={styles.options}
      styleOption={{}}
      options={[
        {
          title: 'Quantidade de paginas',
          isSelected: type==='Quantidade',
          onPress: () => setType('Quantidade')
        },
        {
          title: 'Tamanho',
          isSelected: type==='Tamanho',
          onPress: () => setType('Tamanho')
        },
        ]}
      />

      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.functionContainer}>
            <Text style={styles.label}>Função: H = K mod  </Text>
          <TextInput style={styles.input} value={hashInput} onChangeText={setHashInput}/>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.functionContainer}>
          <Text style={styles.label}>{type}:  </Text>
          <TextInput style={styles.input} value={pageInput} onChangeText={setPageInput}/>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.functionContainer}>
            <Text style={styles.label}>Tamanho do bucket:  </Text>
          <TextInput style={styles.input} value={bucketInput} onChangeText={setBucketInput}/>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=> doSimulator()}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </ImageBackground>
  ) ;
};

export default Settings;
