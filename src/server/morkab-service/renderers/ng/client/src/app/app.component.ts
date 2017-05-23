import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <input id="selected-component" [ngModel]="selectedComponent" (ngModelChange)="onChange($event)">
  <dynamic [html]="dynamicHtml"></dynamic>`
})
export class AppComponent implements OnInit {

  @Input()tag:string;
  @Input()dynamicHtml : string;
  @Input()selectedComponent: string;

  constructor(){
  }
  ngOnChanges(changes: any) {
    console.log(changes);
  }

  onChange(text){
    this.dynamicHtml = text;
  }

  componentChanged(text){
    this.dynamicHtml = text;
  }

  ngOnInit() {
    let tag = document.getElementById('app').getAttribute('tag');
    //props here too
    let tagHTML = `<${tag} name="hello"></${tag}>`;
    this.dynamicHtml = tagHTML;
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
