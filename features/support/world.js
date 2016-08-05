'use strict';

const di = require('../../index.js')();
di.registerDir('./assets/');

function World() {
  this.container = di;
}

module.exports = function () {
  this.World = World;
}
