export default function(name, col, row, qty = 1, value = null) {
  return new Node(name, col, row, qty, value);
}

function Node(name, col, row, qty, value) {
  this.name = name;
  this.col = col;
  this.row = row;
  this.qty = qty;
  this.value = value;
  this.end = true;
  this.freezed = false;
}