'use strict';

const di = new require('bottlejs')();
const fs = require('fs');
const _ = require('lodash');

module.exports = function () {


  function registerModule(servicePath, serviceName) {
    const module = require(servicePath);
    const argList = [serviceName, module].concat(module.deps || [])
    di.service.apply(di, argList);
  }

  function registerDir(path) {
    fs.readdir(path, function(err, serviceDirectories) {
      if (err) {
        throw new Error(`Can not register directory: ${path}`);
      }

      _.forEach(serviceDirectories, function (serviceDirectory){
        const servicePath = [path, serviceDirectory].join('');
        registerModule(servicePath, serviceDirectory);
      });
    });
  }

  function get(dependencyName) {
    return di.container[dependencyName];
  }

  return Object.freeze({
    registerDir,
    get: get
  });
}
