import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooBarComponent } from './foo-bar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FooBarComponent],
    exports: [FooBarComponent],
    entryComponents: [FooBarComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
