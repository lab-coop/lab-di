'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function () {

  const di = new require('bottlejs')();
  function registerModuleByPath(servicePath, serviceName) {
    const module = require(servicePath);
    registerModule(module, serviceName);
  }

  function registerModule(module, serviceName){
    const argList = [serviceName, module].concat(module.deps || [])
    if (module.type === 'factory') {
      di.factory.apply(di, argList);
    } else {
      di.service.apply(di, argList);
    }
  }

  function registerDir(dir, prefix) {
    const serviceDirectories = fs.readdirSync(dir);
    _.forEach(serviceDirectories, function (serviceDirectory){
      const servicePath = [dir, serviceDirectory].join('/');
      if (prefix) {
        const basename = path.basename(serviceDirectory, '.js');
        serviceDirectory = `${prefix}-${basename}`;
      }
      registerModuleByPath(servicePath, serviceDirectory);
      const impDir = [servicePath, 'implementations'].join('/')
      try {
        fs.accessSync(impDir);
        registerDir(impDir, serviceDirectory);
      } catch (e) {
        if (!_.includes(['ENOENT', 'ENOTDIR'], e.code)) {
          throw e;
        }
      }
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
    registerModule,
    get: get
  });
}
