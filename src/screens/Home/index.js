import React, {useState, useMemo} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import ModalList from '../../components/ModalList';
import List from '../../components/List';
import Disk from '../../struct/Disk';
import Table from '../../struct/Table';
import {formatObjectToArray} from '../../utils/fomart';
import styles from './styles';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [pageKeySelected, setPageKeySelected] = useState(null);
  const [search, setSearch] = useState('');

  const table = useMemo(() => new Table(), []);
  console.log(table)
  const tuples = useMemo(() => table.content, []);
  console.log(tuples)
  const disk = useMemo(() => new Disk(tuples), []);
  console.log(disk)
  const pages = useMemo(() => formatObjectToArray(disk.content), []);
  console.log(pages)

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

  const openModal = (pageKey) => {
    setPageKeySelected(pageKey);
    setShowModal(true);
  };

  disk.hash.overflowRate()


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
            <Text style={styles.info}>Taxa de colisões: TODO</Text>
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
      </View>
      { showModal &&
        <ModalList
          pageKey={pageKeySelected}
          close={() => setShowModal(false)}
          tuples={
            search ? [{ key: search, value: disk.get(search)}] : tuplesFromPage
          }
        />
      }
    </>
  );
};

export default Home;
