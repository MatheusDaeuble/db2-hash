import { BUCKET_SIZE } from '../utils/constants'

export default class Bucket {
  constructor (key) {
    this.key = key;
    this.content = {};
    this.space = BUCKET_SIZE;
    this.bucketOverflow = null;
    this.count = 0;
    this.colisionCount = 0;
  }

  add = (pageKey, tupleKey) => {
    if (this.checkSpace()) {
      this.content[tupleKey] = pageKey;
      this.count++;
      this.addCollision()
    } else this.overflow(pageKey, tupleKey);
  }

  get = (tuplaKey) =>
  this.content[tuplaKey] ?
    this.content[tuplaKey] :
    this.bucketOverflow.get(tuplaKey)

  size = () => Object.keys(this.content).length;

  teste = () => {}//console.log(this.overFlowBuckets)

  checkSpace = () => this.count < this.space

  overflow = (pageKey, tupleKey) =>
    this.bucketOverflow ?
      this.bucketOverflow.add(pageKey, tupleKey) :
      this.createBucket(pageKey, tupleKey)

  createBucket = (pageKey, tupleKey) => {
    const name = typeof (this.key) == 'number' ?
      `${this.key}_overflow_1` :
      `${this.key}_overflow_${parseInt(this.key.split('_')[2]) + 1}`
    this.bucketOverflow = new Bucket (name);
    this.bucketOverflow.add(pageKey, tupleKey)
  }

  overflowCount = (count = 0) => {
    return this.bucketOverflow ? this.bucketOverflow.overflowCount(count + 1) : count
  }

  tuples = () => Object.keys(this.content)

  addCollision = () => {
    if(this.count > 1)
      this.colisionCount++;
  }


}
