'use strict';

const fs = require('fs');

module.exports = function() {
  const store = JSON.parse(fs.readFileSync('./assets/config/config.json', 'utf8'));
  return Object.freeze({
    get: function(key) {
      return store[key];
    },
    set: function(key, value) {
      store[key] = value;
    }
  });
}
