'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

module.exports = function() {
  this.Given('a directory with a service "$serviceName"',
    function(serviceName, callback) {
      fs.access('assets/'+ serviceName+ '/index.js', function (nonexistent) {
        if(nonexistent) {
          callback('The given service does not exist');
          return;
        }
        callback();
      });
  });

  this.When('I inicialize the DI', function(callback) {
    const tools = require('../../tools.js')();
    tools.registerDir(path.resolve(__dirname, '../../assets/'));
    this.container = tools.getDI();
    callback();
  });

  this.When('I register the service "$serviceName"', function(serviceName, callback) {
    const di = require('../../index.js')();
    const testModule = require('../../assets/lab-test');
    di.registerModule(testModule, serviceName);
    this.container = di;
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

  this.Then('I see result "$result" for service "$serviceName" with implementation "$implementationName"', function(result, serviceName, implementationName, callback) {
    expect(this.container.get(`${serviceName}-${implementationName}`).test()).to.eql(result);
    callback();
  });

  this.Given('a directory without a lab- prefix "$moduleName" exists', function(moduleName, callback) {
    fs.access('assets/'+ moduleName + '/index.js', function (nonexistent) {
      if(nonexistent) {
        callback('The given module does not exist');
        return;
      }
      callback();
    });
  });

};
