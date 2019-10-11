import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
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
  private placesSub: Subscription ;
  isLoading = false;

  constructor(private placesService: PlacesService, private router: Router, private loadingCtrl : LoadingController) { }

  ngOnInit() {
    this.placesService.offers.subscribe(places =>{
      this.loadedOffers = places;
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
      this.placesService.fetchPlaces().subscribe(()=> {
        this.isLoading = false;
      });
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
