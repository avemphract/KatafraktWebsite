export default class Node {
  _x;
  _y;

  _connections = new Set();

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get connections() {
    return this._connections;
  }
}
