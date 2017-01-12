'use strict';

const fs = require('fs');

module.exports = function() {
  const store = {};
  return Object.freeze({
    get: function(key) {
      return store[key];
    },
    set: function(key, value) {
      store[key] = value;
    }
  });
}
