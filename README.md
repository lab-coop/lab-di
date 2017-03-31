# lab-di

## Introduction

lab-di is a small dependency injection container based on BottleJS. It features directory loading, implementation handling.

## Build a service with different implementations

```
└── service
    ├── implementations
    │   ├── memory.js
    │   └── real.js
    └── index.js
```

service/index.js

```js
function Service(container) {
  const implementation = container.get('config').get(Service.serviceName);
  return container.getImplementation(Service.serviceName, implementation);
}

Service.type = 'factory';
module.exports = Service;
```

service/implementations/memory.js
```js
function MemoryService (config) {
  // return with the memory implementation  
  return {};
}

MemoryService.deps = ['config'];
module.exports = MemoryService;
```

## Register a service into the di container

using the di
```js
const di = require('lab-di')();

di.registerModule(require('./module'), 'Module');
di.registerModule(require('./other'), 'Other');
```

using the tools
```js
const diTools = require('lab-di/tools')();
diTools.registerDir(path.resolve(__dirname, 'services'));
const di = diTools.getDI();
```
