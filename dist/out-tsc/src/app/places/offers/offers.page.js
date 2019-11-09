import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PlacesService } from '../places.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
let OffersPage = class OffersPage {
    constructor(placesService, router, loadingCtrl) {
        this.placesService = placesService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.isLoading = false;
    }
    ngOnInit() {
        this.placesService.offers.subscribe(places => {
            this.loadedOffers = places;
        });
    }
    ionViewWillEnter() {
        this.isLoading = true;
        this.placesService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
        });
    }
    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
    onEdit(offerId, slidingItem) {
        slidingItem.close();
        this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
        console.log('Editing item', offerId);
    }
};
OffersPage = tslib_1.__decorate([
    Component({
        selector: 'app-offers',
        templateUrl: './offers.page.html',
        styleUrls: ['./offers.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [PlacesService, Router, LoadingController])
], OffersPage);
export { OffersPage };
//# sourceMappingURL=offers.page.js.map