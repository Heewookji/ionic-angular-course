import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { Place } from "../../places/place.model";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
let CreateBookingComponent = class CreateBookingComponent {
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
        const availableFrom = new Date(this.selectedPlace.availableFrom);
        const availableTo = new Date(this.selectedPlace.availableTo);
        if (this.selectedMode == "random") {
            this.startDate = new Date(availableFrom.getTime() +
                Math.random() *
                    (availableTo.getTime() -
                        1000 * 60 * 60 * 24 * 7 -
                        availableFrom.getTime())).toISOString();
            this.endDate = new Date(new Date(this.startDate).getTime() +
                Math.random() * (6 * 24 * 60 * 60 * 1000)).toISOString();
        }
    }
    onCancel() {
        this.modalCtrl.dismiss(null, "cancel");
    }
    checkValid() {
        console.log(this.datesValid(), this.form.valid);
    }
    onBookPlace() {
        if (!this.form.valid || !this.datesValid()) {
            return;
        }
        this.modalCtrl.dismiss({
            bookingData: {
                firstName: this.form.value["first-name"],
                lastName: this.form.value["last-name"],
                guestNumber: +this.form.value["guest-number"],
                startDate: new Date(this.form.value["date-from"]),
                endDate: new Date(this.form.value["date-to"])
            }
        }, "confirm");
    }
    datesValid() {
        const startDate = new Date(this.form.value["date-from"]);
        const endDate = new Date(this.form.value["date-to"]);
        return endDate >= startDate;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Place)
], CreateBookingComponent.prototype, "selectedPlace", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CreateBookingComponent.prototype, "selectedMode", void 0);
tslib_1.__decorate([
    ViewChild("f", null),
    tslib_1.__metadata("design:type", NgForm)
], CreateBookingComponent.prototype, "form", void 0);
CreateBookingComponent = tslib_1.__decorate([
    Component({
        selector: "app-create-booking",
        templateUrl: "./create-booking.component.html",
        styleUrls: ["./create-booking.component.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController])
], CreateBookingComponent);
export { CreateBookingComponent };
//# sourceMappingURL=create-booking.component.js.map