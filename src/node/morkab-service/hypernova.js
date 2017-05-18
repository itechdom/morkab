var hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'MyComponent.js') {
      return require('./MyComponent.js');
    }
    return null;
  },

  port: 3030,
});
