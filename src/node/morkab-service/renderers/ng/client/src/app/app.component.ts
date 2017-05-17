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
    this.tag = tag;
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
    this.dynamicHtml = this.tag;
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
