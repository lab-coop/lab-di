'use strict';

const expect = require('chai').expect;
const fs = require('fs');

module.exports = function() {
  this.Given('a directory with a service "$serviceName"', function(serviceName, callback) {
    fs.access('features/assets/test/index.js', function (exists) {
      if (!exists) {
        callback();
        return;
      }
      callback('The given service does not exists');
    })
  });
  this.When('I start the application', function(callback) {
    callback();
  });
  this.Then('I am able to use the "$serviceName" dependency in my internal service', function(serviceName, callback) {
    expect(this.container.get('test').test()).to.eql('test');
    callback();
  });

};
