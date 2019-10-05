import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Offer } from '../offer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  offer: Offer;
  form: FormGroup;
  private offerSub: Subscription;

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
      this.offerSub = this.placesService.getOffer(paramMap.get('placeId')).subscribe( offer => {
        this.offer = offer;
        this.form = new FormGroup({
          title: new FormControl(this.offer.title,{
            updateOn: 'blur',
            validators: Validators.required
          }),
          description: new FormControl(this.offer.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
        
      });


    });
  }

  ngOnDestroy(){
    if(this.offerSub){
      this.offerSub.unsubscribe();
    }
  }

  onUpdateOffer(){
    console.log(this.form);
  }

}
