import node from "./node";
import step from "./step";
import * as d3 from "d3";

export default function(elementId, width = "100%", height = "220px") {
  return new Sammi(elementId, width, height);
}

function Sammi(elementId, width, height) {
  this._id = elementId;
  this._width = width;
  this._height = height;
  this._colWidth = 60;
  this._rowHeight = 50;
  this._fitWidth = true;
  this._nodes = [];
  this._links = [];
  this._data = [];
  this._hintable = false;
  this._selectedName = null;

  // svg
  this._svg = null;
  this._linkGroup = null;
  this._nodeGroup = null;
  this._labelGroup = null;

  this._onNodeClicked = () => {};
  this._proxyNodeClicked = (e, node) => {
    e.stopPropagation();
    this.select(this._selectedName == node.name ? null : node.name);
    this._onNodeClicked(e, this, node);
  };

  addEventListener(
    "resize", (function() {
      if (this._fitWidth) {
        this.refresh();
      }
    }).bind(this));

  d3.select("#" + this._id)
    .style("width", this._width)
    .style("height", this._height)
    .style("border", "1px solid #999999")
    .style("overflow", "auto");
}

Sammi.prototype.id = function() {
  return this._id;
}

Sammi.prototype.reset = function() {
  this._nodes = [];
  this._links = [];
  this._data = [];
  if (this._svg != null) {
    this._linkGroup.selectAll("path").data([]).exit().remove();
    this._nodeGroup.selectAll("circle").data([]).exit().remove();
    this._nodeGroup.selectAll("text").data([]).exit().remove();
    this._labelGroup.selectAll("text").data([]).exit().remove();
  }
  return this;
}

Sammi.prototype.hintable = function(b) {
  if (arguments.length == 0) {
    return this._hintable;
  } else {
    this._hintable = b;
    return this;
  }
}

Sammi.prototype.fitWidth = function(b) {
  if (arguments.length == 0) {
    return this._fitWidth;
  } else {
    this._fitWidth = b;
    this.refresh();
    return this;
  }
}

Sammi.prototype.colWidth = function(v) {
  if (arguments.length == 0) {
    return this._colWidth;
  } else {
    this._colWidth = Math.max(60, v);
    this.refresh();
    return this;
  }
}

Sammi.prototype.rowHeight = function(v) {
  if (arguments.length == 0) {
    return this._rowHeight;
  } else {
    this._rowHeight = Math.max(50, v);
    this.refresh();
    return this;
  }
}

Sammi.prototype.node = function(name, col, row, qty = 1, value = null) {
  var n = node(name, col, row, qty, value);
  this._nodes.push(n);
  return n;
}

Sammi.prototype.link = function(n1, n2, color = '#000000', type = 'S', value = null) {
  var link = {
    source: n1,
    target: n2,
    color: color,
    type: type,
    value: value
  };
  n1.end = false;
  this._links.push(link);
  this._data.push([n1, n2]);
  return this;
}

Sammi.prototype.select = function(name, hintOnly = false) {
  if (!hintOnly) {
    this._selectedName = name;
  }
  var sn = this._selectedName;
  this._linkGroup.selectAll("path").each(function(d) {
    d3.select(this).style("stroke-width", d[0].name == name || d[0].name == sn ? 8 : 3);
  });
  this._nodeGroup.selectAll("circle").each(function(d) {
    d3.select(this).style("fill", d.name == name || d.name == sn ? "#ffff99" : "#dddddd");
  });
}

Sammi.prototype.selectedName = function() {
  return this._selectedName;
}

Sammi.prototype.zip = function() {
  //
  var fill = function(data, from, to) {
    while (from <= to) {
      data[from] = '.';
      from++;
    }
  }
  //
  var isEmpty = function(data, from, to) {
    while (from <= to) {
      if (data[from] == '.') {
        return false;
      }
      from++;
    }
    return true;
  }

  var maxRow = 0;
  var maxCol = 0;
  this._nodes.forEach(n => {
    if (n.row > maxRow) {
      maxRow = n.row;
    }
    if (n.col > maxCol) {
      maxCol = n.col;
    }
  });

  var lines = this._links.filter(l => l.source.row == l.target.row);
  lines.forEach(l => l.source.freezed = l.target.freezed = true);

  var map = [];
  for (var r = 0; r <= maxRow; r++) {
    var curr = new Array(maxCol + 1);
    curr.fill(' ');
    map.push(curr);

    var links = lines.filter(l => l.source.row == r)
    if (links.length == 0) {
      continue;
    }

    var link0 = links[0];
    var link1 = links[links.length - 1];
    var moveable = false;
    for (var x = 1; x < r; x++) {
      var prev = map[x];
      moveable = isEmpty(prev, link0.source.col, link1.target.col);
      if (moveable) {
        links.forEach(link => {
          link.source.row = x;
          link.target.row = x;
        })
        fill(prev, link0.source.col, link1.target.col);
        break;
      }
    }
    if (!moveable) {
      fill(curr, link0.source.col, link1.target.col);
    }
  }

  var ends = this._nodes.filter(n => !n.freezed && n.end);
  ends.sort((a, b) => a.row - b.row).forEach(n => {
    for (var x = 1; x < n.row; x++) {
      var prev = map[x][n.col];
      if (prev == ' ') {
        prev = '.';
        n.row = x;
        break;
      }
    }
  });
};


Sammi.prototype.nodeClicked = function(fn) {
  this._onNodeClicked = fn;
  return this;
}

Sammi.prototype.refresh = function() {
  if (!this._svg) {
    return;
  }

  var x1 = 0;
  var x2 = 1;
  var y1 = 0;
  var y2 = 1;
  this._nodes.forEach(function(node) {
    x1 = Math.min(node.col, x1);
    x2 = Math.max(node.col, x2);
    y1 = Math.min(node.row, y1);
    y2 = Math.max(node.row, y2);
  });

  var div = d3.select("#" + this._id)
  var scrollWidth = div.node().getBoundingClientRect().width;
  var width = this._fitWidth ? Math.max(scrollWidth - 40, this._colWidth * (x2 - x1 + 1)) : this._colWidth * (x2 - x1 + 1);
  var height = this._rowHeight * (y2 - y1 + 1);

  this._svg.attr("width", width);
  this._svg.attr("height", height);

  const xScale = d3.scaleLinear()
    .domain([x1 - 1, x2 + 1])
    .range([0, width])
  const yScale = d3.scaleLinear()
    .domain([y1 - 1, y2 + 1])
    .range([0, height])
  const lineGenerator = d3.line()
    .x(node => xScale(node.col))
    .y(node => yScale(node.row))
    .curve(ctx => step(ctx, 0.9));

  // links
  this._linkGroup.selectAll("path")
    .data(this._data)
    .attr("d", lineGenerator);

  var _rad = 9;
  // nodes
  this._nodeGroup.selectAll("circle")
    .data(this._nodes)
    .attr("cx", node => xScale(node.col))
    .attr("cy", node => yScale(node.row));

  // nodes: qty
  this._nodeGroup.selectAll("text")
    .data(this._nodes)
    .attr("x", node => xScale(node.col))
    .attr("y", node => yScale(node.row))
    .attr("dx", node => node.qty >= 10 ? "-.46em" : "-.20em")
    .attr("dy", ".40em");

  // labels
  this._labelGroup.selectAll("text")
    .data(this._nodes)
    .attr("x", node => xScale(node.col) - _rad)
    .attr("y", node => yScale(node.row) + _rad + 13);
}

Sammi.prototype.fly = function() {
  this.refresh();

  var x1 = 0;
  var x2 = 1;
  var y1 = 0;
  var y2 = 1;
  this._nodes.forEach(function(node) {
    x1 = Math.min(node.col, x1);
    x2 = Math.max(node.col, x2);
    y1 = Math.min(node.row, y1);
    y2 = Math.max(node.row, y2);
  });

  var div = d3.select("#" + this._id)
  if (!this._svg) {
    this._svg = div.append("svg")
      .attr("id", this._id + "_svg");
    this._linkGroup = this._svg
      .append("g")
      .attr("id", this._id + "_svg_links");
    this._nodeGroup = this._svg
      .append("g")
      .attr("id", this._id + "_svg_nodes");
    this._labelGroup = this._svg
      .append("g")
      .attr("id", this._id + "_svg_labels");
  }

  // var scrollWidth = div.property("scrollWidth");
  var scrollWidth = div.node().getBoundingClientRect().width;
  var width = this._fitWidth ? Math.max(scrollWidth - 40, this._colWidth * (x2 - x1 + 1)) : this._colWidth * (x2 - x1 + 1);
  var height = this._rowHeight * (y2 - y1 + 1);

  this._svg.attr("width", width);
  this._svg.attr("height", height);

  const xScale = d3.scaleLinear()
    .domain([x1 - 1, x2 + 1])
    .range([0, width])
  const yScale = d3.scaleLinear()
    .domain([y1 - 1, y2 + 1])
    .range([0, height])
  const lineGenerator = d3.line()
    .x(node => xScale(node.col))
    .y(node => yScale(node.row))
    .curve(ctx => step(ctx, 0.9));

  // links
  this._linkGroup.selectAll("path")
    .data(this._data)
    .enter()
    .append("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke-width", 3)
    .style("stroke-dasharray", (d, i) => this._links[i].type == 'S' ? "6,3" : "0,0")
    .style("stroke", (d, i) => this._links[i].color)

  var _rad = 9;
  // nodes
  this._nodeGroup.selectAll("circle")
    .data(this._nodes)
    .enter()
    .append("circle")
    .attr("class", node => "node-" + node.name)
    .attr("cx", node => xScale(node.col))
    .attr("cy", node => yScale(node.row))
    .attr("r", _rad)
    .style("stroke-width", 2)
    .style("stroke", "black")
    .style("fill", "#dddddd")
    .on("mouseover", (e, d) => this._hintable ? this.select(d.name, true) : this)
    .on("mouseout", (e, d) => this._hintable ? this.select(null, true) : this);

  // nodes: qty
  this._nodeGroup.selectAll("text")
    .data(this._nodes)
    .enter()
    .append("text")
    .attr("x", node => xScale(node.col))
    .attr("y", node => yScale(node.row))
    .attr("dx", node => node.qty >= 10 ? "-.46em" : "-.20em")
    .attr("dy", ".40em")
    .style("font", "11px times")
    .style("cursor", "hand")
    .text(node => node.qty)
    .on("click", this._proxyNodeClicked)
    .on("mouseover", (e, d) => this._hintable ? this.select(d.name, true) : this)
    .on("mouseout", (e, d) => this._hintable ? this.select(null, true) : this);

  // labels
  this._labelGroup.selectAll("text")
    .data(this._nodes)
    .enter()
    .append("text")
    .attr("x", node => xScale(node.col) - _rad)
    .attr("y", node => yScale(node.row) + _rad + 13)
    .attr("fill", "black")
    .style("font", "11px times")
    .style("cursor", "hand")
    .text(node => node.name)
    .on("click", this._proxyClick);
}