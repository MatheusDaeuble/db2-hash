export default class Bucket {
  constructor (key) {
    this.key = key;
    this.content = {};
  }

  add = (pageKey, tupleKey) => this.content[tupleKey] = pageKey;
  get = (tuplaKey) => this.content[tuplaKey];
  size = () => Object.keys(this.content).length;

}