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
    response[column.name] = treatTypeValue(column.type, line[index])
  })
  return response
}

const treatTypeValue = (type, value) => {
  switch (type) {
    case 'int':
      return parseInt(value)
    case 'varchar':
      return value
    case 'decimal':
      return parseFloat(value)
    default:
      break;
  }
}

export default returnTableContent
