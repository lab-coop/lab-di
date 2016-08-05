'use strict';

module.exports = function() {
  this.Given('a directory with a service "$serviceName"', function(serviceName, callback) {
    callback();
  });
  this.When('I start the application', function(callback) {
    callback();
  });
  this.Then('I am able to use the "$serviceName" dependency in my internal service', function(serviceName, callback) {
    callback();
  });

};
