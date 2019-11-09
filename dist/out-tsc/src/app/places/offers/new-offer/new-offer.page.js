import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
let NewOfferPage = class NewOfferPage {
    constructor(placesService, router, loadingCtrl) {
        this.placesService = placesService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
    }
    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                updateOn: "blur",
                validators: Validators.required
            }),
            description: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required]
            }),
            dateTo: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required]
            })
        });
    }
    onCreateOffer() {
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl.create({
            message: 'Creating Places...'
        }).then(loadingEl => {
            loadingEl.present();
            this.placesService.addPlace(this.form.value.title, this.form.value.description, +this.form.value.price, new Date(this.form.value.dateFrom), new Date(this.form.value.dateTo)).subscribe(() => {
                loadingEl.dismiss();
                this.form.reset();
                this.router.navigate(["/places/tabs/offers"]);
            });
        });
    }
};
NewOfferPage = tslib_1.__decorate([
    Component({
        selector: "app-new-offer",
        templateUrl: "./new-offer.page.html",
        styleUrls: ["./new-offer.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [PlacesService,
        Router,
        LoadingController])
], NewOfferPage);
export { NewOfferPage };
//# sourceMappingURL=new-offer.page.js.map