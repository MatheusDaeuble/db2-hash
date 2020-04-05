import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import ModalList from '../../components/ModalList';
import List from '../../components/List';
import Disk from '../../struct/Disk';
import Menu from '../../components/Menu';
import Table from '../../struct/Table';
import { formatObjectToArray } from '../../utils/fomart';
import styles from './styles';

const Home = ({ navigation }) => {

  const settings = navigation.getParam('settings')
  const [showModal, setShowModal] = useState(false);
  const [pageKeySelected, setPageKeySelected] = useState(null);
  const [accessCost, setAccessCost] = useState('0');
  const [search, setSearch] = useState('');
  const [listTuples, setListTuples] = useState({
    whichData: '',
    key: null,
    tuples: []
  })

  const table = useMemo(() => new Table(), []);
  const tuples = useMemo(() => table.content, []);
  const disk = useMemo(() => new Disk(tuples, settings), []);
  const pages = useMemo(() => formatObjectToArray(disk.content), []);
  const buckets = useMemo(() => disk.hash.buckets(), []);

  const [listData, setListData] = useState({
    typeData: 'pages',
    data: pages,
    selectFunction: tupleKey => {
      setSearch('');
      openModal(tupleKey, 'pages');
    }
  })

  const doSearch = () => {
    if (parseInt(search) > 0 && parseInt(search) <= tuples.length) {
      const {pageKey, bucketKey, accessCost } = disk.hash.get(search)
      openModal(
        listData.typeData === 'pages' ? pageKey : bucketKey, 
        listData.typeData
      );
      setAccessCost(accessCost);
    }
  };

  const openModal = (key, whichData = 'pages') => {
    switch (whichData) {
      case 'pages':
        setListTuples({
          whichData,
          key,
          tuples:  search ? 
            [{ key: search, value: disk.get(search) }] : 
            formatObjectToArray(disk.content[key].content)
        });
        break;
      case 'buckets':
        setListTuples({
          whichData,
          key,
          tuples: search ? 
          [disk.hash.get(search)] :
          buckets.find(bucket => bucket.key === key).tuplesPages()
        });
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const showData = (typeData) => {
    switch (typeData) {
      case 'pages':
        setListData({
          typeData,
          data: pages,
          selectFunction: tupleKey => {
            setSearch('');
            openModal(tupleKey, 'pages');
          }
        })
        break;
      case 'buckets':
        setListData({
          typeData,
          data: buckets,
          selectFunction: bucketKey => {
            setSearch('');
            openModal(bucketKey, 'buckets');
          }
        })
        break;
      case 'table':
        setListData({
          typeData,
          data: tuples,
          selectFunction: () => {}
        })
        break;
      default:
        break;
    }
  }

  return (
    <>
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
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Taxa de colisões: {disk.hash.collisionRate() + '%'}</Text>
            <Text style={styles.info}>Taxa de overflow: {disk.hash.overflowRate() + '%'}</Text>
            <Text style={styles.info}>Numero de acessos ao disco: {accessCost}</Text>
            <View style={styles.buttonsContainer}>
            <Menu 
            options={[
              {
                title: 'Páginas',
                isSelected: 'pages' === listData.typeData,
                onPress: () => showData('pages'),
              },
              {
                title: 'Buckets',
                isSelected: 'buckets' === listData.typeData,
                onPress: () => showData('buckets'),
              },
              {
                title: 'Tabela',
                isSelected: 'table' === listData.typeData,
                onPress: () => showData('table'),
              },
            ]}/>
            </View>
          </View>
        </View>
        <List
          data={listData.data}
          typeData={listData.typeData}
          onSelect={bucketKey => listData.selectFunction(bucketKey)}
        />
      </View>
      {showModal &&
        <ModalList
          dataKey={listTuples.key}
          close={() => setShowModal(false)}
          whichData={listTuples.whichData}
          tuples={listTuples.tuples}
        />
      }
    </>
  );
};

export default Home;
