'use strict';

const expect = require('chai').expect;
const fs = require('fs');

module.exports = function() {
  this.Given('a directory with a lab- prefixed service "$serviceName"',
    function(serviceName, callback) {
      fs.access('assets/'+ serviceName+ '/index.js', function (nonexistent) {
        if(nonexistent) {
          callback('The given service does not exist');
          return;
        } else if(serviceName.indexOf('lab-') !== 0) {
          callback('The service is not prefixed with "lab-"');
          return;
        }
        callback();
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
    fs.access(`assets/${serviceName}/implementations/${implementationName}.js`, function (nonexistent) {
      if (!nonexistent) {
        callback();
        return;
      }
      callback('The given implementation does not exist');
    })
  });
  this.When('I use service "$serviceName" with "$implementationName"', function(serviceName, implementationName, callback) {
    callback();
  });
  this.Then('I see result "$result" for service "$serviceName" with implementation "$implementationName"', function(result, serviceName, implementationName, callback) {
    expect(this.container.get(`${serviceName}-${implementationName}`).test()).to.eql(result);
    callback();
  });
};
