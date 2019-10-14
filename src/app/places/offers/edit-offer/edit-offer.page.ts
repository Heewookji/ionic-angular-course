import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { PlacesService } from "../../places.service";
import { Offer } from "../offer.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
  offer: Offer;
  form: FormGroup;
  placeId: string;
  isLoading = false;
  private offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navController.navigateBack("/places/tabs/offers/");
        return;
      }
      this.placeId = paramMap.get("placeId");
      this.isLoading = true;
      this.offerSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe(
          offer => {
            this.offer = offer;
            this.form = new FormGroup({
              title: new FormControl(this.offer.title, {
                updateOn: "blur",
                validators: Validators.required
              }),
              description: new FormControl(this.offer.description, {
                updateOn: "blur",
                validators: [Validators.required, Validators.maxLength(180)]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: "An error occurred!",
                message: "Place could not be fetched. Try again!",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/places/tabs/offers"]);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Updating place..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .updatePlace(
            this.offer.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }
}
