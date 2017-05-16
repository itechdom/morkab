import {
    Component, OnChanges, OnInit, Input, NgModule, NgModuleFactory, Compiler, SimpleChanges
} from '@angular/core';

import { SharedModule } from './shared.module';

@Component({
    selector: 'dynamic',
    template: `<ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`
})
export class DynamicComponent {

    dynamicComponent: any;
    dynamicModule: NgModuleFactory<any>;

    @Input('html')
    html: string;
    @Input()name:string;

    constructor(private compiler: Compiler) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['html'] && !changes['html'].isFirstChange()) {
            this.dynamicComponent = this.createNewComponent(this.html);
            this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
        }
    }

    ngOnInit() {
        this.dynamicComponent = this.createNewComponent(this.html);
        this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
    }

    protected createComponentModule(componentType: any) {
        @NgModule({
            imports: [SharedModule],
            declarations: [
                componentType
            ],
            entryComponents: [componentType]
        })
        class RuntimeComponentModule {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }

    protected createNewComponent(template: string) {

        @Component({
            selector: 'dynamic-component',
            template: template ? template : '<div></div>'
        })
        class MyDynamicComponent {
        }

        return MyDynamicComponent;
    }
}
