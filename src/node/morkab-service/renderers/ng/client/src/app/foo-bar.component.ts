import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foo-bar',
  template: `<h1>Dynamic Foo {{name}}</h1>`
})
export class FooBarComponent implements OnInit {

    name: string;
    @Input()test:string;
    ngOnInit() {
        console.log(this.test);
        this.name = 'Bar';
    }
}
