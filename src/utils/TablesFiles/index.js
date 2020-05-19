import { departaments } from './departaments'
import { employers } from './employers'
import { getRandomTupleKey, shuffle, createTupleKeys } from '../random';

const returnTableContent = (tableName, columns, pk, fk = '') => {
  // todo:
  /*
    criar um arquivo unico para pegar
    todos os dados usar formato de json
   */
  switch (tableName) {
    case 'departamento':
      return formatTuple(readTextFile(departaments), columns, pk)
    case 'empregado':
      return formatTuple(readTextFile(employers), columns, pk)
    default:
      return `didn't work`
  }
}

export const readTextFile = (lines) => {
  const array = lines.split('\n');
  createTupleKeys(array.length);
  return array;
};
// data name é o nome da informação que vai ta na tabela pq ainda n pensei em uma maneira boa pra fazer dinamico depedendo do numero
const formatTuple = (lines, columns, pk, fk = '') => {
  const tuples = [];
  lines.map(line => tuples.push({
    [pk]: getRandomTupleKey(),
    ...setTupleColumnValue(columns, line.split('|'))
  }));
  return shuffle(tuples);
}

const setTupleColumnValue = (columns, line) => {
  let response = {}
  columns.map((column, index) => {
    console.log(column)
    console.log(line)
    console.log(index)
    response[column] = line[index]
  })
  return response
}
export default returnTableContent