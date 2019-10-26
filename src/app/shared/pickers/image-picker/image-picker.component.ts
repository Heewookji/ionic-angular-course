import { Component, OnInit, Output } from '@angular/core';
import { Plugins,Capacitor, CameraResultType, CameraSource } from '@capacitor/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

//new-offer.html에 있는 (imagePick)과 연결된 이벤트 객체
@Output() imagePick = new EventEmitter<string>();
selectedImage: string;

  constructor() { }

  ngOnInit() {}



  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera')){
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    }).then( image => {
      //base64라는 것을 알려주는 앞 표현식을 넣는다.
      this.selectedImage = "data:image/jpeg;base64," + image.base64String;
      //이벤트 emit하여 string 값을 넘겨준다.
      this.imagePick.emit(this.selectedImage);
    }).catch(error => {
      console.log(error);
      return false;
    })
  }

}
