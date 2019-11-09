import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OfferBookingPage } from './offer-booking.page';
const routes = [
    {
        path: '',
        component: OfferBookingPage
    }
];
let OfferBookingPageModule = class OfferBookingPageModule {
};
OfferBookingPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [OfferBookingPage]
    })
], OfferBookingPageModule);
export { OfferBookingPageModule };
//# sourceMappingURL=offer-booking.module.js.map