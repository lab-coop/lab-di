'use strict';

function factoryTest(container){
  const labTestService = container.get('lab-test');
  function test() {return 'factory-' + labTestService.test();}

  return Object.freeze({test});
}

factoryTest.type = 'factory';
module.exports = factoryTest;
