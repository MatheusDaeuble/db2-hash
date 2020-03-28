import { NUMBER_MAX_PAGES }  from '../utils/constants';
import Bucket  from './Bucket';

export default class Hash {

  constructor(tuples) {
    this.prime = this.generatePrimeNumber(NUMBER_MAX_PAGES);
    this.table = this.generateHashTable(tuples);
  }

  generateHashTable = (tuples) => {
    const table = {};
    this.generateHashPrototype(tuples).map(key => {
      table[key] = new Bucket(key);
    })
    return table;
  }

  generateHashPrototype = (tuples) => {
    const prototype = [];
    tuples.map(tuple=> {
      const key = this.function(tuple.key);
      if (!prototype.includes(key)) return prototype.push(key);
    })
    return prototype;
  }

  showBucketsSize = () => {
    let cont = 0
    Object.keys(this.table).map(key=> {
      const size = this.table[key].size();
      cont = cont + size;
    })
  }

  add = (pageKey, tupleKey) => 
    this.table[this.function(tupleKey)].add(pageKey, tupleKey);

  get = (tupleKey) => 
    this.table[this.function(tupleKey)].get(tupleKey);

  function = (key) => key % this.prime;

  generatePrimeNumber = (number) => {
    let currentNumber=number;
    while (true) {
      if(this.isPrime(currentNumber)) return currentNumber;
      currentNumber++;
    }
  }
  
  isPrime = number => {
    for(let i = 2; i < number; i++)
      if (number % i === 0) return false;
    return number > 1;
  }

}