import Regex, { createTableSubRegex, testQuerie } from '../utils/Regex'
import Table from './Table';

export default class Parser {

  constructor (setence) {
    this.action = this.searchAction(this.format(setence));
  }

  format = (setence) => {
    return Regex().map(r => r.exec(setence)).filter(el => el !== null)[0]
  }

  searchAction = (options) => {
    switch(options[1]){
      case 'select':
        if(options[5] === 'where')
          return this.select(options[2], options[4], [options[6], options[7], options[8]])
        return this.select(options[2], options[4])
      case 'create table':
        console.log('create table')
        return this.createTable(options[2], options[3], options[4])
      default:
        break
    }
  }

  createTable = (tableName, fields, primaryKeyColumn) => {
    console.log(primaryKeyColumn)
    const columns = this.findTableColumns(fields).filter(field => field !== primaryKeyColumn.trim())
    // console.log(`criar tabela de nome ${tableName} com os campos ${columns}`)
    // const table = new Table(tableName, columns, primaryKeyColumn)
    // console.log(table)
    // return table
  }

  findTableColumns = (fields) => {
    // const regex = /\s*([a-zA-Z_]+)\s*(varchar|int)\(?([0-9]+)?\)?\s*([a-zA-Z ]+)?$/gm
    const regex = /\s*([a-zA-Z_]+)\s*(varchar|int|decimal)?\(?([0-9\s*,]+)?\)?([not\s*null]+)?\s*,/gm;
    fields = testQuerie(fields, regex)
    console.log(fields)
    console.log(testQuerie(fields, regex))
    // const matches = fields.map(field => regex.exec(field)).filter(el => el !== null)
    // testes que individualmente funcionam mas juntos n funcionam
      // console.log(regex.exec('cod_dep int not null'))
      // console.log('######')
      // console.log(regex.exec(' nome varchar(30) not null'))
    // TODO: fazer o regex funcionar para o loop acima
    return fields.map(field => field.trim().split(' ')[0]) // so pra quebrar um galho e pegar as colunas
  }

  select = (which, table, where = '') => {
    if(where)
      return console.log(`selecionar ${which} na tabela ${table} onde ${where[0]} for ${where[1]} que ${where[2]}`)
    return console.log(`selecionar ${which} na tabela ${table}`)
  }
}
