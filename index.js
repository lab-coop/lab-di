'use strict';

const di = new require('bottlejs')();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function () {

  function registerModule(servicePath, serviceName) {
    const module = require(servicePath);
    const argList = [serviceName, module].concat(module.deps || [])
    if (module.type === 'factory') {
      di.factory.apply(di, argList);
    } else {
      di.service.apply(di, argList);
    }
  }

  function registerDir(dir, prefix) {
    fs.readdir(dir, function(err, serviceDirectories) {
      if (err) {
        const error = `Can not register directory: ${dir} ${err}`;
        throw new Error(error);
      }

      _.forEach(serviceDirectories, function (serviceDirectory){
        const servicePath = [dir, serviceDirectory].join('/');
        if (prefix) {
          const basename = path.basename(serviceDirectory, '.js');
          serviceDirectory = `${prefix}-${basename}`;
        }
        if(serviceDirectory.indexOf('lab-') !== 0) {
          return;
        }
        registerModule(servicePath, serviceDirectory);
        const impDir = [servicePath, 'implementations'].join('/')
        fs.access(impDir, function(nonexistent) {
          if (!nonexistent) {
            registerDir(impDir, serviceDirectory)
          }
        });
      });
    });
  }

  function get(dependencyName) {
    return di.container[dependencyName];
  }

  function getImplementation(service, implementation) {
    return di.container[`${service}-${implementation}`];
  }

  di.container.getImplementation = getImplementation;

  return Object.freeze({
    registerDir,
    get: get
  });
}
