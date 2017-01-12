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

  this.When('I initialize the DI', function(callback) {
    const tools = require('../../tools.js')();
    tools.registerDir(path.resolve(__dirname, '../../assets/'));
    this.container = tools.getDI();
    callback();
  });

  this.When('I register the service "$serviceName"', function(serviceName, callback) {
    const tools = require('../../tools.js')();
    try {
      tools.registerModuleDir(__dirname + '/../../assets/' + serviceName, serviceName);
      this.container = tools.getDI();
    } catch (e) {
      this.error = e;
    }
    callback();
  });

  this.When('I register a service "$serviceName" into "$containerName"', function(serviceName, containerName, callback) {
    const di = require('../../index.js')();
    const testModule = require('../../assets/lab-test');
    di.registerModule(testModule, serviceName);
    this.containers[containerName] = di;
    callback();
  });

  this.When('I merge "$containerNameA" into "$containerNameB"', function (containerNameA, containerNameB, callback){
    this.containers[containerNameB].extend(this.containers[containerNameA]);
    callback();
  });

  this.Then('I see result "$result" for service "$serviceName" using "$container"', function(result, serviceName, container, callback) {
    expect(this.containers[container].get(serviceName).test()).to.eql(result);
    callback();
  });

  this.Then('I see result "$result" for service "$serviceName"', function(result, serviceName, callback) {
    expect(this.container.get(serviceName).test()).to.eql(result);
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

    const tools = require('../../tools.js')();
    tools.registerModuleDir(path.resolve(__dirname, '../../assets/', serviceName), serviceName);
    tools.registerModuleDir(path.resolve(__dirname, '../../assets/config'), 'config');
    const di = tools.getDI();
    di.get('config').set(serviceName, implementationName);
    expect(di.get(serviceName).test()).to.eql(result);
    callback();
  });

  this.Then('I see error "$error"', function(error, callback) {
    expect(this.error).to.match(new RegExp(error));
    callback();
  });

};
