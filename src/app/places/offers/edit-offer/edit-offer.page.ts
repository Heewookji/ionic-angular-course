import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Offer } from '../offer.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  offer: Offer;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if(!paramMap.has("placeId")){
        this.navController.navigateBack('/places/tabs/offers/');
        return;
      }
      this.offer = this.placesService.getOffer(paramMap.get('placeId') );
    });
    
  }

}
