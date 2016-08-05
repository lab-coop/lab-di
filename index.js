'use strict';

const di = new require('bottlejs')();
const fs = require('fs');
const _ = require('lodash');

module.exports = function () {

  function registerDir(path) {
    fs.readdir(path, function(err, serviceDirectories) {
      if (err) {
        throw new Error(`Can not register directory: ${path}`);
      }

      _.forEach(serviceDirectories, function (serviceDirectory){
        const servicePath = [path, serviceDirectory].join('');
        const module = require(servicePath);
        di.service(serviceDirectory, module);
        const argList = [serviceDirectory, module].concat(module.deps || [])
        di.service.apply(di, argList);
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
