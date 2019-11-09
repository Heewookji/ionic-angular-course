import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BookingService } from "./booking.service";
import { LoadingController } from "@ionic/angular";
let BookingsPage = class BookingsPage {
    constructor(bookingService, loadingCtrl) {
        this.bookingService = bookingService;
        this.loadingCtrl = loadingCtrl;
        this.isLoading = false;
    }
    ngOnInit() {
        this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
            this.loadedBookings = bookings;
        });
    }
    ionViewWillEnter() {
        this.isLoading = true;
        this.bookingService.fetchBookings().subscribe(bookings => {
            this.isLoading = false;
        });
    }
    ngOnDestroy() {
        if (this.bookingSub) {
            this.bookingSub.unsubscribe();
        }
    }
    onCancelBooking(bookingId, slidingEl) {
        slidingEl.close();
        this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
            loadingEl.present();
            this.bookingService.cancelBooking(bookingId).subscribe(() => {
                loadingEl.dismiss();
            });
        });
    }
};
BookingsPage = tslib_1.__decorate([
    Component({
        selector: "app-bookings",
        templateUrl: "./bookings.page.html",
        styleUrls: ["./bookings.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [BookingService, LoadingController])
], BookingsPage);
export { BookingsPage };
//# sourceMappingURL=bookings.page.js.map