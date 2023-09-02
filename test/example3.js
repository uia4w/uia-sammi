var map = uia.sammi.create('sammi1', "100%", "600px")
  .fitWidth(false)
  .colWidth(60)
  .rowHeight(60)
  .nodeClicked((e, s, node) => alert(node.value));


function b1() {
  map.reset();

  var n11 = map.node("WD8HQ007.1", 1, 0, 25);
  var n12 = map.node("WD8HQ007.1", 2, 0, 23);
  var n13 = map.node("WD8HQ007.1", 3, 0, 22);
  var n14 = map.node("WD8HQ007.1", 4, 0, 24);
  var n15 = map.node("WD8HQ007.1", 5, 0, 25);
  var n21 = map.node("WD8HQ007.1", 2, 1, 2);
  var n31 = map.node("WD8HQ007.1", 3, 2, 1);

  map.link(n11, n12, '#ff0000', 'S');
  map.link(n11, n21, '#ff0000', 'S');
  map.link(n12, n13, '#00ff00', 'S');
  map.link(n12, n31, '#00ff00', 'S');
  map.link(n13, n14, '#0000ff', 'M');
  map.link(n21, n14, '#0000ff', 'M');
  map.link(n14, n15, '#666666', 'M');
  map.link(n31, n15, '#666666', 'M');

  map.fly();
}

function b2() {
  map.reset();

  var k0_0 = map.node('L.1', 0, 0, 25, 'BD1XE031.1');
  var k10_0 = map.node('L.1', 10, 0, 23, 'BD1XE031.1');
  var k10_1 = map.node('L.6', 10, 1, 2, 'BD1XE031.6');
  var k11_0 = map.node('L.1', 11, 0, 19, 'BD1XE031.1');
  var k11_2 = map.node('L.7', 11, 2, 4, 'BD1XE031.7');
  var k12_0 = map.node('L.1', 12, 0, 4, 'BD1XE031.1');
  var k12_3 = map.node('L.8', 12, 3, 15, 'BD1XE031.8');
  var k13_3 = map.node('L.8', 13, 3, 12, 'BD1XE031.8');
  var k13_4 = map.node('L.9', 13, 4, 3, 'BD1XE031.9');
  var k14_0 = map.node('L.1', 14, 0, 8, 'BD1XE031.1');
  var k15_0 = map.node('L.1', 15, 0, 11, 'BD1XE031.1');
  var k16_0 = map.node('L.1', 16, 0, 23, 'BD1XE031.1');
  var k17_0 = map.node('L.1', 17, 0, 25, 'BD1XE031.1');
  var k18_0 = map.node('L.1', 18, 0, 6, 'BD1XE031.1');
  var k18_1 = map.node('L.10', 18, 1, 19, 'BD1XE031.10');
  var k19_0 = map.node('L.1', 19, 0, 4, 'BD1XE031.1');
  var k19_2 = map.node('L.11', 19, 2, 2, 'BD1XE031.11');
  var k1_0 = map.node('L.1', 1, 0, 17, 'BD1XE031.1');
  var k1_1 = map.node('L.2', 1, 1, 8, 'BD1XE031.2');
  var k20_0 = map.node('L.1', 20, 0, 2, 'BD1XE031.1');
  var k20_3 = map.node('L.12', 20, 3, 2, 'BD1XE031.12');
  var k21_0 = map.node('L.1', 21, 0, 21, 'BD1XE031.1');
  var k22_0 = map.node('L.1', 22, 0, 23, 'BD1XE031.1');
  var k23_0 = map.node('L.1', 23, 0, 25, 'BD1XE031.1');
  var k24_0 = map.node('L.1', 24, 0, 24, 'BD1XE031.1');
  var k24_1 = map.node('L.13', 24, 1, 1, 'BD1XE031.13');
  var k25_0 = map.node('L.1', 25, 0, 13, 'BD1XE031.1');
  var k25_2 = map.node('L.14', 25, 2, 11, 'BD1XE031.14');
  var k26_0 = map.node('L.1', 26, 0, 2, 'BD1XE031.1');
  var k26_3 = map.node('L.15', 26, 3, 11, 'BD1XE031.15');
  var k27_0 = map.node('L.1', 27, 0, 13, 'BD1XE031.1');
  var k28_0 = map.node('L.1', 28, 0, 14, 'BD1XE031.1');
  var k29_0 = map.node('L.1', 29, 0, 12, 'BD1XE031.1');
  var k29_2 = map.node('L.16', 29, 2, 2, 'BD1XE031.16');
  var k2_0 = map.node('L.1', 2, 0, 19, 'BD1XE031.1');
  var k2_1 = map.node('L.2', 2, 1, 6, 'BD1XE031.2');
  var k30_3 = map.node('L.17', 30, 3, 4, 'BD1XE031.17');
  var k31_2 = map.node('L.16', 31, 2, 4, 'BD1XE031.16');
  var k31_3 = map.node('L.17', 31, 3, 2, 'BD1XE031.17');
  var k32_0 = map.node('L.1', 32, 0, 10, 'BD1XE031.1');
  var k32_3 = map.node('L.17', 32, 3, 4, 'BD1XE031.17');
  var k3_0 = map.node('L.1', 3, 0, 25, 'BD1XE031.1');
  var k4_0 = map.node('L.1', 4, 0, 8, 'BD1XE031.1');
  var k4_1 = map.node('L.3', 4, 1, 17, 'BD1XE031.3');
  var k5_0 = map.node('L.1', 5, 0, 25, 'BD1XE031.1');
  var k6_0 = map.node('L.1', 6, 0, 23, 'BD1XE031.1');
  var k6_1 = map.node('L.4', 6, 1, 2, 'BD1XE031.4');
  var k7_0 = map.node('L.1', 7, 0, 25, 'BD1XE031.1');
  var k8_0 = map.node('L.1', 8, 0, 24, 'BD1XE031.1');
  var k8_1 = map.node('L.5', 8, 1, 1, 'BD1XE031.5');
  var k9_0 = map.node('L.1', 9, 0, 25, 'BD1XE031.1');
  map.link(k0_0, k1_0, '#ff0000', 'S');
  map.link(k0_0, k1_1, '#ff0000', 'S');
  map.link(k1_1, k2_1, '#00ff00', 'S');
  map.link(k1_1, k2_0, '#00ff00', 'S');
  map.link(k1_0, k2_0, '#00ff00', 'S');
  map.link(k2_1, k3_0, '#ff00ff', 'M');
  map.link(k2_0, k3_0, '#ff00ff', 'M');
  map.link(k3_0, k4_0, '#999900', 'S');
  map.link(k3_0, k4_1, '#999900', 'S');
  map.link(k4_1, k5_0, '#ff0000', 'M');
  map.link(k4_0, k5_0, '#ff0000', 'M');
  map.link(k5_0, k6_0, '#00ff00', 'S');
  map.link(k5_0, k6_1, '#00ff00', 'S');
  map.link(k6_1, k7_0, '#ff00ff', 'M');
  map.link(k6_0, k7_0, '#ff00ff', 'M');
  map.link(k7_0, k8_0, '#999900', 'S');
  map.link(k7_0, k8_1, '#999900', 'S');
  map.link(k8_1, k9_0, '#ff0000', 'M');
  map.link(k8_0, k9_0, '#ff0000', 'M');
  map.link(k9_0, k10_0, '#00ff00', 'S');
  map.link(k9_0, k10_1, '#00ff00', 'S');
  map.link(k10_0, k11_0, '#ff00ff', 'S');
  map.link(k10_0, k11_2, '#ff00ff', 'S');
  map.link(k11_0, k12_0, '#999900', 'S');
  map.link(k11_0, k12_3, '#999900', 'S');
  map.link(k12_3, k13_3, '#ff0000', 'S');
  map.link(k12_3, k13_4, '#ff0000', 'S');
  map.link(k11_2, k14_0, '#00ff00', 'M');
  map.link(k12_0, k14_0, '#00ff00', 'M');
  map.link(k13_4, k15_0, '#ff00ff', 'M');
  map.link(k14_0, k15_0, '#ff00ff', 'M');
  map.link(k13_3, k16_0, '#999900', 'M');
  map.link(k15_0, k16_0, '#999900', 'M');
  map.link(k10_1, k17_0, '#ff0000', 'M');
  map.link(k16_0, k17_0, '#ff0000', 'M');
  map.link(k17_0, k18_0, '#00ff00', 'S');
  map.link(k17_0, k18_1, '#00ff00', 'S');
  map.link(k18_0, k19_0, '#ff00ff', 'S');
  map.link(k18_0, k19_2, '#ff00ff', 'S');
  map.link(k19_0, k20_0, '#999900', 'S');
  map.link(k19_0, k20_3, '#999900', 'S');
  map.link(k18_1, k21_0, '#ff0000', 'M');
  map.link(k20_0, k21_0, '#ff0000', 'M');
  map.link(k19_2, k22_0, '#00ff00', 'M');
  map.link(k21_0, k22_0, '#00ff00', 'M');
  map.link(k20_3, k23_0, '#ff00ff', 'M');
  map.link(k22_0, k23_0, '#ff00ff', 'M');
  map.link(k23_0, k24_0, '#999900', 'S');
  map.link(k23_0, k24_1, '#999900', 'S');
  map.link(k24_0, k25_0, '#ff0000', 'S');
  map.link(k24_0, k25_2, '#ff0000', 'S');
  map.link(k25_0, k26_0, '#00ff00', 'S');
  map.link(k25_0, k26_3, '#00ff00', 'S');
  map.link(k25_2, k27_0, '#ff00ff', 'M');
  map.link(k26_0, k27_0, '#ff00ff', 'M');
  map.link(k24_1, k28_0, '#999900', 'M');
  map.link(k27_0, k28_0, '#999900', 'M');
  map.link(k28_0, k29_0, '#ff0000', 'S');
  map.link(k28_0, k29_2, '#ff0000', 'S');
  map.link(k26_3, k30_3, '#00ff00', 'S');
  map.link(k26_3, k30_3, '#00ff00', 'S');
  map.link(k30_3, k31_3, '#ff00ff', 'S');
  map.link(k30_3, k31_2, '#ff00ff', 'S');
  map.link(k29_2, k31_2, '#ff00ff', 'S');
  map.link(k29_0, k32_0, '#999900', 'S');
  map.link(k29_0, k32_3, '#999900', 'S');
  map.link(k31_3, k32_3, '#999900', 'S');

  map.fly();
}

function b3() {
  map.reset();
  map.fly();
}