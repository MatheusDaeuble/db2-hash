import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import Parser from '../../struct/Parser';

const Test = ({ navigation }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    doSearch()
  }, [])

  const doSearch = () => {
    const parser2 = new Parser(`
      create table empregado (
        matri int not null,nome varchar(60) not null,salario decimal(16,2) not null, lotacao int not null,
        constraint pk_matri
          primary key(matri),
        constraint fk_lotacao
          foreign key(lotacao)
          references departamento
      )
    `)
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={doSearch} style={styles.searchButton}>
            <Text>Pesquisar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Test;
