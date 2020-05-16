import { getTable } from '../utils/readFile'
import returnTableContent from '../utils/TablesFiles'

export default class Table {
  // esses parametros é so pra testar e n quebrar a tela de home atual
  constructor(tableName = 'departamens', dataName = 'nome', pk = 'cod_dep', fk = '') {
    this.content = getTable(),
    this.newContent = this.getTableContent(tableName, dataName, pk)
  }

  getTableContent = (tableName, dataName, pk) => {
    return returnTableContent(tableName, dataName, pk )
  }
}
