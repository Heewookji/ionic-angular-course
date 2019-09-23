import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Offer } from './offer.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  loadedOffers: Offer[];

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.loadedOffers = this.placesService.offers;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]);
    console.log('Editing item', offerId);
  }

}
