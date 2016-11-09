'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

module.exports = function() {
  // Scenario: I see the parsed dependencies from a directory
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

  this.When('I inicialize the DI', function(callback) {
    const di = require('../../index.js')();
    di.registerDir(path.resolve(__dirname, '../../assets/'));
    this.container = di;
    callback();
  });
  this.Then('I am able to use the "$serviceName" dependency in my internal service', function(serviceName, callback) {
    expect(this.container.get(serviceName).test()).to.eql('test');
    callback();
  });

  // Scenario: I can use different implementations of a registered service
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
  
  // Scenario: I can not register a non-lab- prefixed module
  this.Given('a directory without a lab- prefix "$moduleName" exists', function(moduleName, callback) {
    fs.access('assets/'+ moduleName + '/index.js', function (nonexistent) {
      if(nonexistent) {
        callback('The given module does not exist');
        return;
      }
      callback();
    });
  });
  this.Then('I see the module "$moduleName" is undefined in the di', function(moduleName, callback) {
    expect(this.container.get(moduleName)).to.not.exist;
    callback();
  });
};
