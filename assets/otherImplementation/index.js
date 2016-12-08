'use strict';

function ImplementationC () {
  return Object.freeze({
    test: function () {return 'result C';}
  });
};

ImplementationC.service = 'lab-testWithImplementations';
ImplementationC.implementation = 'implementationC';
module.exports = ImplementationC;
