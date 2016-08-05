'use strict';

const expect = require('chai').expect;
const fs = require('fs');

module.exports = function() {
  this.Given(
      'a directory with a service "$serviceName"',
    function(serviceName, callback) {
    fs.access('assets/'+ serviceName+ '/index.js', function (exists) {
      if (!exists) {
        callback();
        return;
      }
      callback('The given service does not exists');
    });
  });
  this.When('I start the application', function(callback) {
    callback();
  });
  this.Then('I am able to use the "$serviceName" dependency in my internal service', function(serviceName, callback) {
    expect(this.container.get(serviceName).test()).to.eql('test');
    callback();
  });
  this.Given('an implemenation "$implementationName" in service "$serviceName"', function(implementationName, serviceName, callback) {
    fs.access(`assets/${serviceName}/implementations/${implementationName}.js`, function (exists) {
      if (!exists) {
        callback();
        return;
      }
      callback('The given implementation does not exists');
    })
  });
  this.When('I use service "$serviceName" with "$implementationName"', function(serviceName, implementationName, callback) {
    callback();
  });
  this.Then('I see result "$result" for service "$serviceName"', function(result, serviceName, callback) {
    expect(this.container.get(serviceName).test()).to.eql(result);
    callback();
  });
};
