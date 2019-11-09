import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewOfferPage } from './new-offer.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
const routes = [
    {
        path: '',
        component: NewOfferPage
    }
];
let NewOfferPageModule = class NewOfferPageModule {
};
NewOfferPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            SharedModule
        ],
        declarations: [NewOfferPage]
    })
], NewOfferPageModule);
export { NewOfferPageModule };
//# sourceMappingURL=new-offer.module.js.map