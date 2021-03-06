import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import ModalList from '../../components/ModalList';
import List, { TableList } from '../../components/List';
import Disk from '../../struct/Disk';
import Menu from '../../components/Menu';
import Table from '../../struct/Table';
import { formatObjectToArray } from '../../utils/fomart';
import styles from './styles';
import Parser from '../../struct/Parser';

const Home = ({ navigation }) => {

  const settings = navigation.getParam('settings')
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [accessCost, setAccessCost] = useState(-1);
  const [search, setSearch] = useState('');
  const [listTuples, setListTuples] = useState({
    whichData: '',
    key: null,
    tuples: []
  })

  // const parser = useMemo(() => new Parser(`
  //   create table departamento (
  //     cod_dep int not null, nome varchar(30) not null,
  //     constraint pk_dep
  //       primary key(cod_dep)
  //   )
  // `), []);


  const table = useMemo(() => new Table(), []);
  const tuples = useMemo(() => table.content, []);
  const disk = useMemo(() => new Disk(tuples, settings), []);
  const pages = useMemo(() => formatObjectToArray(disk.content), []);
  const buckets = useMemo(() => disk.hash.buckets(), []);
  const overflows = useMemo(() => buckets.flatMap(bucket => bucket.getOverflowBuckets()), []);

  const [listData, setListData] = useState({
    typeData: 'pages',
    data: pages,
    selectFunction: tupleKey => {
      setSearch('');
      openModal(tupleKey, 'pages');
    }
  })

  const doSearch = () => {
    (!search && listData.typeData === 'table') && showData(listData.typeData)
    if (parseInt(search) > 0 && parseInt(search) <= tuples.length) {
      const { pageKey, bucketKey, accessCost } = disk.hash.get(search)
      listData.typeData === 'table' ? doSearchTable(pageKey, search) :
        openModal(
          listData.typeData === 'pages' ? pageKey : bucketKey,
          listData.typeData
        );
      setAccessCost(accessCost);
      setSearch('')
    }
  };

  doSearchTable = (pageKey, tupleKey) => {
    setListData({
      ...listData,
      data: [{ key: search, value: disk.content[pageKey].content[tupleKey] }],
    })
  }

  const openModal = (key, whichData = 'pages') => {
    switch (whichData) {
      case 'pages':
        setListTuples({
          whichData,
          key,
          tuples: search ?
            [{ key: search, value: disk.get(search) }] :
            formatObjectToArray(disk.content[key].content),

        });
        break;
      case 'buckets':
        const bucket = buckets.find(bucket => bucket.key === key);
        setListTuples({
          whichData,
          key,
          tuples: search ?
            [disk.hash.get(search)] :
            bucket.tuplesPages()
        });
        break;
      case 'overflows':
        const overflow = overflows.find(overflow => overflow.key === key);
        setListTuples({
          whichData,
          key,
          tuples: search ?
            [disk.hash.get(search)] :
            overflow.tuplesPages(),
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
        setShowTable(false)
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
        setShowTable(false)
        break;
      case 'table':
        setListData({
          typeData,
          data: tuples,
          selectFunction: () => { }
        })
        setShowTable(true)
        break;
      case 'overflows':
        setListData({
          typeData,
          data: overflows,
          selectFunction: overflowKey => {
            setSearch('');
            openModal(overflowKey, 'overflows');
          }
        })
        setShowTable(false)
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
            <Text style={styles.info}>Numero de buckets: {`${disk.hash.keys().length} + (${disk.hash.overflowCount()} Overflows)`}</Text>
            <Text style={styles.info}>Tamanho do bucket: {settings.BUCKET_SIZE}</Text>
            <Text style={styles.info}>Numero de acessos ao disco: {parseInt(accessCost) + 1}</Text>
            <View style={styles.buttonsContainer}>
              <Menu
                selected={listData.typeData}
                onPress={(value) => showData(value)}
                options={[
                  {
                    label: 'Páginas',
                    value: 'pages',
                  },
                  {
                    label: 'Buckets',
                    value: 'buckets',
                  },
                  {
                    label: 'Tabela',
                    value: 'table',
                  },
                  {
                    label: 'Overflows',
                    value: 'overflows',
                  },
                ]}
              />
            </View>
          </View>
        </View>
        {showTable
          ? <TableList
            data={listData.data}
            typeData={listData.typeData}
          />
          : <List
            data={listData.data}
            typeData={listData.typeData}
            onSelect={(key) => listData.selectFunction(key)}
          />
        }

      </View>
      {showModal &&
        <ModalList
          dataKey={listTuples.key}
          close={() => setShowModal(false)}
          whichData={listTuples.whichData}
          tuples={listTuples.tuples}
          overflows={(listTuples.bucketsOverflow || [])}
        />
      }
    </>
  );
};

export default Home;
