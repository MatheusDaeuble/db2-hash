export default class Page {

  constructor (content, key) {
    this.key = key;
    this.name = 'Page ' + key;
    this.content = this.format(content);
  }

  format = (content) => {
    const formated = {};
    content.map(tuple=> formated[tuple.key] = tuple.value);
    return formated;
  }

  get = (key) => this.content[key];
  add = (tuple) => this.content[tuple.key] = tuple.value;
  getAllTupleKeys = () => Object.keys(this.content);
}
