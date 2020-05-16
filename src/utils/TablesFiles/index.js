import {departaments} from './departaments'
import {employers} from './employers'
import {getRandomTupleKey, shuffle, createTupleKeys} from '../random';

const returnTableContent = (tableName, dataName, pk, fk = '') =>  {
  switch (tableName) {
    case 'departamento':
        return formatTuple(readTextFile(departaments), dataName, pk)
    default:
        return `didn't work`
  }
}

export const readTextFile = (words) => {
  const array = words.split('\n');
  createTupleKeys(array.length);
  return array;
};
// data name é o nome da informação que vai ta na tabela pq ainda n pensei em uma maneira boa pra fazer dinamico depedendo do numero
const formatTuple = (words, dataName, pk,  fk = '') => {
  const tuples = [];
  words.map(word => tuples.push({[pk]: getRandomTupleKey(), [dataName]: word}));
  return shuffle(tuples);
}

export default returnTableContent
