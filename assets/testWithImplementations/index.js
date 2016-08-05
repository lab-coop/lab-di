'use strict';

function testWithImplementations(container){
  const implementation = container.config.get('testWithImplementations');
  return container.getImplementation('testWithImplementations', implementation);
}

testWithImplementations.type = 'factory';
module.exports = testWithImplementations;
