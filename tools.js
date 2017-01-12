'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function () {

  const di = new require('./index.js')();
  function registerModuleByPath(servicePath, serviceName) {
    try {
      const module = require(servicePath);
      di.registerModule(module, serviceName);
    } catch (e) {
      // console.log(e);
    }
  }

  function registerDir(dir) {
    const serviceDirectories = fs.readdirSync(dir).filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });

    _.forEach(serviceDirectories, function (serviceDirectory){
      registerModuleDir(dir + '/' + serviceDirectory, serviceDirectory);
    });
  }

  function registerModuleDir(dir, name) {
    registerServiceDirectory(dir, 'index.js', {name});
  }

  function registerServiceDirectory(dir, defaultServiceName, options) {
    let servicePath = dir;
    let serviceName = defaultServiceName;
    if (options.name) {
      serviceName = options.name;
    }
    registerModuleByPath(servicePath, serviceName);
    const impDir = [servicePath, 'implementations'].join('/')
    try {
      fs.accessSync(impDir);
      registerImplementations(impDir, serviceName);
    } catch (e) {
      if (!_.includes(['ENOENT', 'ENOTDIR'], e.code)) {
        throw e;
      }
    }
  }

  function registerImplementations(dir, prefix) {
    const serviceDirectories = fs.readdirSync(dir);
    _.forEach(serviceDirectories, function (serviceDirectory){
      const servicePath = [dir, serviceDirectory].join('/');
      const basename = path.basename(serviceDirectory, '.js');
      serviceDirectory = `${prefix}-${basename}`;

      registerModuleByPath(servicePath, serviceDirectory);
    });
  }



  function getDI() {
    return di;
  }

  return Object.freeze({
    registerDir,
    registerModuleDir,
    getDI: getDI
  });
}
