import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}</h1>
  <p>Dynamic loaded HTML below:</p>
  <input [(ngModel)]="selectedComponent" (ngModelChange)="componentChanged($event)" placeholder="name"/>
  <dynamic [name]="name" [html]="dynamicHtml"></dynamic>`
})
export class AppComponent implements OnInit {

  @Input()name:string;
  @Input()dynamicHtml : string;
  @Input()selectedComponent: string;

  ngOnChanges(changes: any) {
    console.log(changes);
  }

  componentChanged(text){
    this.dynamicHtml = text;
  }

  ngOnInit() {
    console.log('loading dynamic html');
    this.dynamicHtml = '<foo-bar></foo-bar>';
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
