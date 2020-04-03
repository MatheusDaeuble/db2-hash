//import { NUMBER_MAX_PAGES }  from '../utils/constants';
import Bucket  from './Bucket';
import { generatePrimeNumber } from '../utils/prime'

export default class Hash {

  constructor(tuples) {
    this.prime = generatePrimeNumber(1000);
    this.table = this.generateHashTable(tuples);
  }

  function = (key) => key % this.prime;

  add = (pageKey, tupleKey) => 
    this.table[this.function(tupleKey)].add(pageKey, tupleKey);

  get = (tupleKey) => 
    this.table[this.function(tupleKey)].get(tupleKey);

  generateHashTable = (tuples) => {
    const table = {};
    this.generateHashPrototype(tuples).map(key => table[key] = new Bucket(key))
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

  keys = () => Object.keys(this.table)

  overflowRate = () => {
    const overflowCount = this.overflowCount() 
    return (overflowCount/(this.keys().length + overflowCount) * 100).toFixed(2)
  }

  overflowCount = () => 
    this.keys().reduce((count, key) =>  
      parseInt(count) + parseInt(this.table[key].overflowCount()))

  showBucketsSize = () => {
    let count = 0
    this.keys().map(key=> {
      const size = this.table[key].size();
      count = count + size;
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
