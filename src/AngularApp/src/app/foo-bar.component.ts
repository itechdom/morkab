import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foo-bar',
  template: `<h1>Dynamic Foo {{name}}</h1>`
})
export class FooBarComponent implements OnInit {

    name: string;

    ngOnInit() {
        this.name = 'Bar';
    }
}
