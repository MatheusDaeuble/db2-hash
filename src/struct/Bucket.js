import { BUCKET_SIZE } from '../utils/constants'

export default class Bucket {
  constructor(key, level = 0) {
    this.key = level ? `${key.toString().split('_')[0]}_${level}` : key; 
    this.level = level;
    this.content = {};
    this.space = BUCKET_SIZE;
    this.bucketOverflow = null;
    this.count = 0;
    this.collisionCount = 0;
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
      {
        pageKey: this.content[tuplaKey],
        tuplaKey,
        accessCost: this.accessCost()
      } :
      this.bucketOverflow.get(tuplaKey)

  size = () => Object.keys(this.content).length;

  checkSpace = () => this.count < this.space

  overflow = (pageKey, tupleKey) =>
    this.bucketOverflow ?
      this.bucketOverflow.add(pageKey, tupleKey) :
      this.createBucket(pageKey, tupleKey)

  createBucket = (pageKey, tupleKey) => {
    this.bucketOverflow = new Bucket(this.key, this.level + 1);
    this.bucketOverflow.add(pageKey, tupleKey)
  }

  overflowCount = (count = 0) =>
    this.bucketOverflow ? this.bucketOverflow.overflowCount(count + 1) : count
  
  tuples = () => Object.keys(this.content)

  pages = () => Object.values(this.content)

  tuplesPages = () => {
    const indexes = this.tuples()
    return this.pages().map((page, index) => ({ page, index: indexes[index]}))
  }

  addCollision = () => {
    if (this.count > 1)
      this.collisionCount++;
  }

  accessCost = () => this.level + 1
}
