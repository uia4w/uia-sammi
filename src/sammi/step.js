export default function(context, t, r = 20) {
  return new Step(context, t, r);
}

function Step(context, t, r) {
  this._context = context;
  this._t = t;
  this._r = r;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) {
      this._context.lineTo(this._x, this._y);
    }
    if (this._line || (this._line !== 0 && this._point === 1)) {
      this._context.closePath();
    }
    if (this._line >= 0) {
      this._t = 1 - this._t, this._line = 1 - this._line;
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2; // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = Math.max(x - this._r * 2, Math.min(x - this._r, this._x * (1 - this._t) + x * this._t));
          var y1 = this._y * 0.5 + y * 0.5;
          this._context.arcTo(x1, this._y, x1, y1, 10);
          this._context.arcTo(x1, y, x, y, 10);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};