import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import Parser from '../../struct/Parser';
import Disk from '../../struct/Disk';
import { formatObjectToArray } from '../../utils/fomart';


const Test = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [tables, setTables] = useState({
    departament: {},
    employers: {},
    dependents: {}
  })
  const settings = {
    BUCKET_SIZE: 974,
    HASH_NUMBER: 479,
    NUMBER_MAX_PAGES: 200,
    PAGE_SIZE: 2332
  }
  useEffect(() => {
    generateDepartaments()
    generateEmployers()
  }, [])

  const parser = useMemo(() => new Parser(), [])

  const doSearch = () => {
    // const parser2 = parser.processSQL(`
    //   create table empregado (
    //     matri int not null,nome varchar(60) not null,salario decimal(16,2) not null, lotacao int not null,
    //     constraint pk_matri
    //       primary key(matri),
    //     constraint fk_lotacao
    //       foreign key(lotacao)
    //       references departamento
    //   )
    // `)
  };

  const generateDepartaments = () => {
    const departamentsTable = parser.processSQL(`
      create table departamento (
        cod_dep int not null,nome varchar(30) not null,
      constraint pk_dep
        primary key(cod_dep)
      )
    `)
    console.log(departamentsTable.newContent[0])
    const disk = new Disk(departamentsTable.newContent, settings)
    // const departamentsPages = formatObjectToArray(departamentsDisk.content)
    // const departamentsBuckets = departamentsDisk.hash.buckets()
    // const departamentsOverflows = departamentsBuckets.flatMap(bucket => bucket.getOverflowBuckets())
    setTables({
      ...tables,
      departament: {
        disk
      }
    })
  }

  const generateEmployers = () => {
    const employersTable = parser.processSQL(`
      create table empregado (
        matri int not null,nome varchar(60) not null,salario decimal(16,2) not null, lotacao int not null,
        constraint pk_matri
          primary key(matri),
        constraint fk_lotacao
          foreign key(lotacao)
          references departamento
      )
    `)
    console.log(employersTable.newContent[0])

    const disk = new Disk(employersTable.newContent, settings)
    setTables({
      ...tables,
      employers: {
        disk
      }
    })
  }

  // const generateDependents = () => {

  // }


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
