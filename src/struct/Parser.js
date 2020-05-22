import Regex, { createTableSubRegex, testQuerie } from '../utils/Regex'
import Table from './Table';

export default class Parser {

  constructor() {
  }

  processSQL = (sql) => this.searchAction(this.format(sql));

  format = (sql) => {
    return Regex().map(r => r.exec(sql)).filter(el => el !== null)[0]
  }

  searchAction = (options) => {
    switch (options[1]) {
      case 'select':
        if (options[5] === 'where')
          return this.select(options[2], options[4], [options[6], options[7], options[8]])
        return this.select(options[2], options[4])
      case 'create table':
        return this.createTable({
          tableName: options[2],
          columns: options[3],
          primaryKeyColumn: options[5],
          foreignKey: options[7],
          tableReferences: options[8]
        })
      default:
        break
    }
  }

  createTable = ({ tableName, columns, primaryKeyColumn, foreignKey, tableReferences }) => {
    return new Table(tableName, this.getColumns(columns, primaryKeyColumn), primaryKeyColumn, foreignKey, tableReferences )
  }

  getColumns = (columns, primaryKeyColumn) => this.findTableColumns(columns).filter(column => !primaryKeyColumn.trim().includes(column.name))

  findTableColumns = (columns, ) => {
    columns = testQuerie(columns, createTableSubRegex)
    return this.turnRegexToColumnInfo(columns)
  }

  turnRegexToColumnInfo = (columns) =>
    columns.map(column =>
      ({
        name: column[1].trim(),
        type: column[2].trim(),
        amount: column[3].trim(),
        isNull: column[4].trim()
      })
    )

  select = (which, table, where = '') => {
    if (where)
      return console.log(`selecionar ${which} na tabela ${table} onde ${where[0]} for ${where[1]} que ${where[2]}`)
    return console.log(`selecionar ${which} na tabela ${table}`)
  }
}
