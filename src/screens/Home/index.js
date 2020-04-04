import React, {useState, useMemo} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import ModalList from '../../components/ModalList';
import List, { BucketList } from '../../components/List';
import Disk from '../../struct/Disk';
import Table from '../../struct/Table';
import {formatObjectToArray} from '../../utils/fomart';
import styles from './styles';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [pageKeySelected, setPageKeySelected] = useState(null);
  const [bucketSelected, setBucketSelected] = useState({
    key: null,
    tuples: []
  });
  const [listTuples, setListTuples] = useState({
    whichData: '',
    key: null,
    tuples: []
  })
  const [search, setSearch] = useState('');

  const table = useMemo(() => new Table(), []);
  const tuples = useMemo(() => table.content, []);
  const disk = useMemo(() => new Disk(tuples), []);
  const pages = useMemo(() => formatObjectToArray(disk.content), []);
  const buckets = useMemo(() => disk.hash.buckets(), []);

  const tuplesFromPage = useMemo(() =>
    pageKeySelected &&
    formatObjectToArray(disk.content[pageKeySelected].content),
    [pageKeySelected]
  );

  const doSearch = () => {
    parseInt(search) > 0 &&
    parseInt(search) <= tuples.length &&
    openModal(disk.hash.get(search));
  };

  const openModal = (key, whichData = 'pages') => {
    switch (whichData) {
      case 'pages':
        setPageKeySelected(key);
        setListTuples({
          whichData,
          key,
          tuples: formatObjectToArray(disk.content[key].content)
        });
        break;
      case 'buckets':
        setListTuples({
          whichData,
          key,
          tuples: buckets.filter(bucket => bucket.key === key)[0].tuples()
        });
        break;
      default:
        break;
    }
    setShowModal(true);
  };

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
            <Text style={styles.info}>Taxa de colisões: {disk.hash.colisionRate() + '%'}</Text>
            <Text style={styles.info}>Taxa de overflow: {disk.hash.overflowRate() + '%'}</Text>
            <Text style={styles.info}>Numero de acessos ao disco: TODO</Text>
          </View>
        </View>
        <List
          pages={pages}
          onSelect={tupleKey => {
            setSearch('');
            openModal(tupleKey);
          }}
        />
        {/* <BucketList
          buckets={buckets}
          onSelect={bucketKey => {
            setSearch('');
            openModal(bucketKey, 'buckets');
          }}
        /> */}
      </View>
      { showModal &&
        <ModalList
          key={listTuples.key}
          close={() => setShowModal(false)}
          whichData={listTuples.whichData}
          tuples={
            search ? [{ key: search, value: disk.get(search)}] : listTuples.tuples
          }
        />
      }
    </>
  );
};

export default Home;
