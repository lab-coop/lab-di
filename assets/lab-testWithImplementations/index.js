'use strict';

function testWithImplementations(container){
  const implementation = container.get('config').get(testWithImplementations.serviceName);
  return container.getImplementation(testWithImplementations.serviceName, implementation);
}

testWithImplementations.type = 'factory';
module.exports = testWithImplementations;
