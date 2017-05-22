var hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'MyComponent') {
      return require('./myComponent.js');
    }
    return null;
  },

  port: 3030,
});
