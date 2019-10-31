import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { PlaceLocation } from "../../location.model";
import { switchMap } from 'rxjs/operators';

const base64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

@Component({
  selector: "app-new-offer",
  templateUrl: "./new-offer.page.html",
  styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

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
      }),
      location: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)
    });
  }
  //PlaceLocation을 받아서 폼에 업데이트한다.
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }
  //Image를 받아서 폼에 업데이트한다.
  onImagePicked(imageData: string | File) {
    let imageFile;
    //넘어온 데이터가 base64일 경우 파일로 만들어준다.
    if (typeof imageData == "string") {
      try {
        imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log(error);
        return;
      }
      //넘어온 데이터가 파일일 경우 그냥 쓴다.
    } else {
      imageFile = imageData;
    }

    this.form.patchValue({ image: imageFile });
  }

  //폼 적합성을 따지고, 새 장소를 만든다.
  onCreateOffer() {
    if (!this.form.valid || !this.form.get("image").value) {
      return;
    }

    this.loadingCtrl
      .create({
        message: "Creating Places..."
      })
      .then(loadingEl => {
        loadingEl.present();

        this.placesService
          .uploadImage(this.form.get("image").value)
          .pipe(switchMap(uploadRes => {
          return  this.placesService
            .addPlace(
              this.form.value.title,
              this.form.value.description,
              +this.form.value.price,
              new Date(this.form.value.dateFrom),
              new Date(this.form.value.dateTo),
              this.form.value.location,
              uploadRes.imageUrl
            )
          }))
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }
}
