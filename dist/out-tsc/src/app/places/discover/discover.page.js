import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PlacesService } from '../places.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
let DiscoverPage = class DiscoverPage {
    constructor(placesService, menuCtrl, authService) {
        this.placesService = placesService;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.isLoading = false;
    }
    ngOnInit() {
        this.placeSub = this.placesService.places.subscribe(places => {
            this.loadedPlaces = places;
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        });
    }
    ionViewWillEnter() {
        this.isLoading = true;
        this.placesService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
        });
    }
    onOpenMenu() {
        this.menuCtrl.toggle();
    }
    onFilterUpdate(event) {
        if (event.detail.value == 'all') {
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        }
        else {
            this.relevantPlaces = this.loadedPlaces.filter(place => place.userId != this.authService.userId);
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        }
        console.log(event.detail);
    }
    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
};
DiscoverPage = tslib_1.__decorate([
    Component({
        selector: 'app-discover',
        templateUrl: './discover.page.html',
        styleUrls: ['./discover.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [PlacesService, MenuController, AuthService])
], DiscoverPage);
export { DiscoverPage };
//# sourceMappingURL=discover.page.js.map