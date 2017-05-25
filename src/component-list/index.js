import {componentList as materialUI, wrapper as materialUIWrapper} from './libs/material-ui.js';
import {componentList as grommetUI, wrapper as grommetWrapper} from './libs/grommet.js';
import {componentList as coreUI, wrapper as coreWrapper} from './libs/core';

export default [
  {
    name:"Core",
    componentList:coreUI,
    wrapper:coreWrapper
  },
  {
    name:"Material",
    componentList:materialUI,
    wrapper:materialUIWrapper
  },
  // {
  //   name:"grommet",
  //   componentList:grommetUI,
  //   wrapper:grommetWrapper
  // }
]
