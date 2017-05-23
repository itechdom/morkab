import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foo-bar',
  template: `<h1>Dynamic Foo {{name}}</h1>`
})
export class FooBarComponent implements OnInit {

    @Input()name: string;
    @Input()test:string;
    ngOnInit() {
        console.log(this.name);
    }
}
