import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditOfferPage } from './edit-offer.page';
import { ReactiveFormsModule } from '@angular/forms';
const routes = [
    {
        path: '',
        component: EditOfferPage
    }
];
let EditOfferPageModule = class EditOfferPageModule {
};
EditOfferPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [EditOfferPage]
    })
], EditOfferPageModule);
export { EditOfferPageModule };
//# sourceMappingURL=edit-offer.module.js.map