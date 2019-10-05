import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { PlacesService } from "../../places.service";
import { Offer } from "../offer.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-offer-booking",
  templateUrl: "./offer-booking.page.html",
  styleUrls: ["./offer-booking.page.scss"]
})
export class OfferBookingPage implements OnInit, OnDestroy {
  offer: Offer;
  private offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.offerSub = this.placesService
        .getOffer(paramMap.get("placeId"))
        .subscribe(offer => {
          this.offer = offer;
        });
    });
  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
}
