//import { NUMBER_MAX_PAGES }  from '../utils/constants';
import Bucket  from './Bucket';
import { generatePrimeNumber } from '../utils/prime'

export default class Hash {

  constructor(tuples, settings) {
    this.settings = settings;
    this.prime = settings.HASH_NUMBER //generatePrimeNumber(settings.HASH_NUMBER);
    this.table = this.generateHashTable(tuples);
  }

  function = (key) => key % this.prime;

  add = (pageKey, tupleKey) =>
    this.table[this.function(tupleKey)].add(pageKey, tupleKey);

  get = (tupleKey) =>
    this.table[this.function(tupleKey)].get(tupleKey);

  generateHashTable = (tuples) => {
    const table = {};
    this.generateHashPrototype(tuples).map(key =>
      table[key] = new Bucket(key, 0, this.settings)
    )
    return table;
  }

  generateHashPrototype = (tuples) => {
    const prototype = [];
    tuples.map(tuple=> {
      const key = this.function(tuple.key);
      if (!prototype.includes(key)) return prototype.push(key);
    })
    this.settings.BUCKET_SIZE = parseInt(tuples.length/prototype.length)
    return prototype;
  }

  keys = () => Object.keys(this.table)

  buckets = () => this.keys().map(key => this.table[key])

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

  collisionRate = () => {
    const collisionRateByBucket = this.calcCollisionRateByBucket()
    return ((collisionRateByBucket.reduce((sum, bucketRate) =>
      sum + bucketRate) / collisionRateByBucket.length ) * 100).toFixed(2)
  }

  calcCollisionRateByBucket = () =>
    this.keys().map(key =>
      parseInt(this.table[key].collisionCount())/parseInt(this.table[key].size())
    )
}
