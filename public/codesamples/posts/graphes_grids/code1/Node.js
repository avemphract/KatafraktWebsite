export default class Node {
  _name;

  connections = new Set();

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}