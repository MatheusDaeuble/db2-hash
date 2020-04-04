import { PAGE_SIZE, NUMBER_MAX_PAGES }  from '../utils/constants'
import { createPageKeys, getRandomPageKey } from '../utils/random';
import Page from './Page';
import Hash from './Hash'

export default class Disk {
  
  constructor(tuples) {
    this.content = this.fillPage(tuples);
    this.hash = new Hash(tuples);
    this.addAllInHash();
  }
  
  add = (pageKey, tuple) => this.content[pageKey].add(tuple);
  get = (tupleKey) => this.content[this.hash.get(tupleKey).pageKey].get(tupleKey);

  getAllPageKeys = () => Object.keys(this.content);

  addAllInHash = () => 
    this.getAllPageKeys().map(pageKey => 
      this.content[pageKey].getAllTupleKeys().map(tupleKey =>
        this.hash.add(pageKey, tupleKey)
      )
    )

  fillPage = (tuples) => {
    createPageKeys(PAGE_SIZE);
    const t = tuples.slice();
    let pages = {};
    while(t.length) {
      const key = getRandomPageKey();
      pages[key] = new Page(t.splice(t.length - PAGE_SIZE, PAGE_SIZE), key);
    }
    return pages;
  }

}
