import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { ModalController } from '@ionic/angular';
let MapModalComponent = class MapModalComponent {
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        //AIzaSyC3eIkzmwVRwekcE_U9I-ddI0VADJy7bJ0
    }
    getGoogleMaps() {
        const win = window;
        const googleModule = win.google;
        if (googleModule && )
            ;
    }
    onCancel() {
        this.modalCtrl.dismiss();
    }
};
MapModalComponent = tslib_1.__decorate([
    Component({
        selector: "app-map-modal",
        templateUrl: "./map-modal.component.html",
        styleUrls: ["./map-modal.component.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController])
], MapModalComponent);
export { MapModalComponent };
//# sourceMappingURL=map-modal.component.js.map