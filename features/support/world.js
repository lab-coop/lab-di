'use strict';

const di = require('../../index.js')();
di.registerDir('./features/assets/');

function World() {
  this.container = di;
}

module.exports = function () {
  this.World = World;
}
