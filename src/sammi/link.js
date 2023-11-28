export default function(name, n1, n2, color, type, value) {
  return new Link(name, n1, n2, color, type, value);
}

function Link(name, n1, n2, color, type, value) {
  this._name = name;
  this._source = n1;
  this._target = n2;
  this._color = color;
  this._type = type;
  this._value = value;
}