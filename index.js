'use strict';

const Bottle = require('bottlejs');
const _ = require('lodash');

module.exports = function () {

  const di = new Bottle();

  function registerModule(module, serviceName){
    if (module.service) {
      serviceName = module.service;
    }
    if (module.implementation) {
      serviceName = `${serviceName}-${module.implementation}`;
    }
    const argList = [serviceName, module].concat(module.deps || [])
    if (module.type === 'factory') {
      module.serviceName = serviceName;
      di.factory.apply(di, argList);
    } else {
      di.service.apply(di, argList);
    }
  }

  function get(dependencyName) {
    try {
      return di.container[dependencyName];
    } catch (error) {
      throw new Error(`Can not get the dependency "${dependencyName}": ${error}`)
    }
  }

  function getImplementation(service, implementation) {
    try {
      const depenedncy = di.container[`${service}-${implementation}`];
      if (!depenedncy) {
        throw new Error(`Can not found the implementation "${implementation}" for the service "${service}"`)
      }
      return depenedncy;
    } catch (error) {
      throw new Error(`Can not get the implementation "${implementation}" for the service "${service}": ${error}`)
    }
  }

  function extend(source) {
    source.container.$list().forEach(function (serviceName) {
      if (!_.includes(di.container.$list(), serviceName)) {
        di.service.apply(di, [serviceName, function(){ return source.get(serviceName)}]);
      }
    });
  }

  di.container.getImplementation = getImplementation;
  di.container.get = get;
  di.registerModule = registerModule;
  di.get = get;
  di.extend = extend;

  return di;

}
