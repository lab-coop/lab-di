'use strict';

const Bottle = require('bottlejs');

module.exports = function () {

  const di = new Bottle();

  function registerModule(module, serviceName){
    const argList = [serviceName, module].concat(module.deps || [])
    if (module.type === 'factory') {
      di.factory.apply(di, argList);
    } else {
      di.service.apply(di, argList);
    }
  }

  function get(dependencyName) {
    return di.container[dependencyName];
  }

  function getImplementation(service, implementation) {
    return di.container[`${service}-${implementation}`];
  }

  di.container.getImplementation = getImplementation;

  return Object.freeze({
    registerModule,
    get: get
  });
}
