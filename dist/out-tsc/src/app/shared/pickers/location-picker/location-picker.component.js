import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
let LocationPickerComponent = class LocationPickerComponent {
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() { }
    onPickLocation() {
        this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
            modalEl.present();
        });
    }
};
LocationPickerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-location-picker',
        templateUrl: './location-picker.component.html',
        styleUrls: ['./location-picker.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController])
], LocationPickerComponent);
export { LocationPickerComponent };
//# sourceMappingURL=location-picker.component.js.map