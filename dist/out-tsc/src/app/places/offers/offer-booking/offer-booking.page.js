import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { PlacesService } from "../../places.service";
let OfferBookingPage = class OfferBookingPage {
    constructor(route, navCtrl, placesService) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.placesService = placesService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has("placeId")) {
                this.navCtrl.navigateBack("/places/tabs/offers");
                return;
            }
            this.offer = this.placesService.getOffer(paramMap.get('placeId'));
        });
    }
};
OfferBookingPage = tslib_1.__decorate([
    Component({
        selector: "app-offer-booking",
        templateUrl: "./offer-booking.page.html",
        styleUrls: ["./offer-booking.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        NavController,
        PlacesService])
], OfferBookingPage);
export { OfferBookingPage };
//# sourceMappingURL=offer-booking.page.js.map