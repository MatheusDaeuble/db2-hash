import Regex, { createTableSubRegex, testQuerie } from '../utils/Regex'
import Table from './Table';

export default class Parser {

  constructor(setence) {
    this.action = this.searchAction(this.format(setence));
  }

  format = (setence) => {
    return Regex().map(r => r.exec(setence)).filter(el => el !== null)[0]
  }

  searchAction = (options) => {
    switch (options[1]) {
      case 'select':
        if (options[5] === 'where')
          return this.select(options[2], options[4], [options[6], options[7], options[8]])
        return this.select(options[2], options[4])
      case 'create table':
        return console.log(this.createTable(options[2], options[3], options[4]))
      default:
        break
    }
  }

  createTable = (tableName, fields, primaryKeyColumn) => new Table(tableName, this.getColumns(fields, primaryKeyColumn), primaryKeyColumn)

  getColumns = (fields, primaryKeyColumn) => this.findTableColumns(fields).filter(column => !primaryKeyColumn.trim().includes(column.name))

  findTableColumns = (fields,) => {
    fields = testQuerie(fields, createTableSubRegex)
    return this.turnRegexToColumnInfo(fields)
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
