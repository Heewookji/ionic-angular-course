import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
const routes = [
    {
        path: '',
        component: PlaceDetailPage
    }
];
let PlaceDetailPageModule = class PlaceDetailPageModule {
};
PlaceDetailPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [PlaceDetailPage, CreateBookingComponent],
        entryComponents: [CreateBookingComponent]
    })
], PlaceDetailPageModule);
export { PlaceDetailPageModule };
//# sourceMappingURL=place-detail.module.js.map