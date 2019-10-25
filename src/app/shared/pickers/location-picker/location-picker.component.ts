import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  ModalController,
  ActionSheetController,
  AlertController
} from "@ionic/angular";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { HttpClient } from "@angular/common/http";
import { map, switchMap } from "rxjs/operators";
import { PlaceLocation, Coordinates } from "../../../places/location.model";
import { of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Plugins, Capacitor } from "@capacitor/core";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"]
})
export class LocationPickerComponent implements OnInit {
  //PlaceLocation을 담은 이벤트를 new-off의 html에서 쓸수 있도록 넘겨준다.
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}


  //action sheet 실행
  onPickLocation() {
    this.actionSheetCtrl.create({
      header: "Please Choose",
      buttons: [
        {
          text: "Auto-Locate",
          handler: () => {
            this.locateUser();
          }
        },
        {
          text: "Pick on Map",
          handler: () => {
            this.openMap();
          }
        },
        { text: "Cancel", role: "cancel" }
      ]
    }).then(actionEl => {
      actionEl.present();
    });
  }

  //geolocation 기능을 이용해 현재 위치 기반으로 PlaceLocation 생성
  private locateUser() {
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.showErrorAlert();
      return;
    }
    this.isLoading = true;
    Plugins.Geolocation.getCurrentPosition()
      .then( geoPosition => {
        const coordinates: Coordinates = {lat:geoPosition.coords.latitude, lng: geoPosition.coords.longitude};
        this.createPlace(coordinates.lat, coordinates.lng);
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        this.showErrorAlert();
      });
  }

  //에러 얼럿 메서드
  private showErrorAlert() {
    this.alertCtrl
      .create({
        header: "Could not fetch location",
        message: "Please use the map to pick a location!",
        buttons: ['Okay']
      })
      .then(alertEl => {
        alertEl.present();
      });
  }


  //lat lng를 전달받아 PlaceLocation을 만든다.
  private createPlace(lat: number, lng: number){

    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    };

    this.isLoading = true;
    //observable을 받는 경우에는 subscribe를 해야 실제로 요청이 이루어진다.
    this.getAddress(pickedLocation.lat, pickedLocation.lng)
      .pipe(
        switchMap(address => {
          pickedLocation.address = address;
          //getMapImage에서 스트링을 주므로 of로 Observable로 만들어준다.
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  private openMap() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
 
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        const coordinates: Coordinates = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        }
        this.createPlace(coordinates.lat, coordinates.lng);
      });
      modalEl.present();
    });
  }

  //위도 경도와 API키를 가지고 http 요청을 해 주소를 가져온다.(geocode api)
  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || !geoData.results.length) {
            return;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}&key=${environment.googleMapsAPIKey}`;
  }
}
