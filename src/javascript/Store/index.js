import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';
const HOST = "http://localhost:8082";

export class Morkab {
  components = [];
  constructor() {

  }
}

export class Component {
  id;
  props;
  children;
  location;
  constructor(date){
    this.id = uuidV4();
  }
}
