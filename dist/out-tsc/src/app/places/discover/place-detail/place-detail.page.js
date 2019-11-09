import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController, } from "@ionic/angular";
import { PlacesService } from "../../places.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { BookingService } from "../../../bookings/booking.service";
import { AuthService } from "../../../auth/auth.service";
let PlaceDetailPage = class PlaceDetailPage {
    constructor(route, navCtrl, placesService, modalCtrl, actionSheetCtrl, bookingService, loadingController, authService, alertCtrl, router) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.placesService = placesService;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.bookingService = bookingService;
        this.loadingController = loadingController;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.router = router;
        this.isBookable = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has("placeId")) {
                this.navCtrl.navigateBack("/places/tabs/discover");
                return;
            }
            this.isLoading = true;
            this.placesService.getPlace(paramMap.get("placeId"))
                .subscribe(place => {
                this.place = place;
                this.isBookable = place.userId != this.authService.userId;
                this.isLoading = false;
            }, error => {
                this.alertCtrl.create({ header: "An error occurred!",
                    message: "Place could not be fetched. Try again!",
                    buttons: [
                        {
                            text: "Okay",
                            handler: () => {
                                this.router.navigate(["/places/tabs/discover"]);
                            }
                        }
                    ] }).then(alertEl => alertEl.present());
            });
        });
    }
    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
    onBookPlace() {
        // this.router.navigateByUrl('/places/tabs/discover');
        // this.navCtrl.navigateBack("/places/tabs/discover");
        // this.navCtrl.pop();
        this.actionSheetCtrl
            .create({
            header: "Choose an Action!",
            buttons: [
                {
                    text: "Select Date",
                    handler: () => {
                        this.openBookingModal("select");
                    }
                },
                {
                    text: "Random Date",
                    handler: () => {
                        this.openBookingModal("random");
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        })
            .then(actionSheetEl => {
            actionSheetEl.present();
        });
    }
    openBookingModal(mode) {
        console.log(mode);
        this.modalCtrl
            .create({
            component: CreateBookingComponent,
            componentProps: { selectedPlace: this.place, selectedMode: mode }
        })
            .then(modalEl => {
            modalEl.present();
            return modalEl.onDidDismiss();
        })
            .then(resultData => {
            if (resultData.role == "confirm") {
                this.loadingController
                    .create({
                    message: "Creating booking..."
                })
                    .then(loadingEl => {
                    loadingEl.present();
                    const data = resultData.data.bookingData;
                    this.bookingService
                        .addBooking(this.place.id, this.place.title, this.place.imageUrl, data.firstName, data.lastName, data.guestNumber, data.startDate, data.endDate)
                        .subscribe(() => {
                        loadingEl.dismiss();
                    });
                });
            }
        });
    }
};
PlaceDetailPage = tslib_1.__decorate([
    Component({
        selector: "app-place-detail",
        templateUrl: "./place-detail.page.html",
        styleUrls: ["./place-detail.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        NavController,
        PlacesService,
        ModalController,
        ActionSheetController,
        BookingService,
        LoadingController,
        AuthService,
        AlertController,
        Router])
], PlaceDetailPage);
export { PlaceDetailPage };
//# sourceMappingURL=place-detail.page.js.map