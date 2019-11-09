import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OffersPage } from './offers.page';
import { OfferItemComponent } from './offer-item/offer-item.component';
const routes = [
    {
        path: '',
        component: OffersPage
    }
];
let OffersPageModule = class OffersPageModule {
};
OffersPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [OffersPage, OfferItemComponent]
    })
], OffersPageModule);
export { OffersPageModule };
//# sourceMappingURL=offers.module.js.map