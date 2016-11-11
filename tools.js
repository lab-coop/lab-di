'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function () {

  const di = new require('./index.js')();
  function registerModuleByPath(servicePath, serviceName) {
    const module = require(servicePath);
    di.registerModule(module, serviceName);
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

  function getDI() {
    return di;
  }

  return Object.freeze({
    registerDir,
    getDI: getDI
  });
}
