import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Place } from '../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
 

  loadedOffers: Place[];
  private placesSub: Subscription 

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.placesService.offers.subscribe(places =>{
      this.loadedOffers = places;
    })
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
     }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]);
    console.log('Editing item', offerId);
  }

}
