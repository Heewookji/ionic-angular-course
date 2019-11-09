import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Place } from '../../place.model';
let OfferItemComponent = class OfferItemComponent {
    constructor() { }
    ngOnInit() { }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Place)
], OfferItemComponent.prototype, "offer", void 0);
OfferItemComponent = tslib_1.__decorate([
    Component({
        selector: 'app-offer-item',
        templateUrl: './offer-item.component.html',
        styleUrls: ['./offer-item.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], OfferItemComponent);
export { OfferItemComponent };
//# sourceMappingURL=offer-item.component.js.map