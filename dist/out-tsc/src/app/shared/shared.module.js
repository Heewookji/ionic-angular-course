import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [LocationPickerComponent, MapModalComponent],
        imports: [CommonModule, IonicModule],
        exports: [LocationPickerComponent, MapModalComponent],
        entryComponents: [MapModalComponent]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map