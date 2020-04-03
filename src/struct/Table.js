import { getTable } from '../utils/readFile'

export default class Table {
  constructor() {
    this.content = getTable()
  }
}
