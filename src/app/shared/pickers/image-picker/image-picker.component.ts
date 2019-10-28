import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  Plugins,
  Capacitor,
  CameraResultType,
  CameraSource
} from "@capacitor/core";
import { EventEmitter } from "@angular/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  //#filePicker 엘레멘트에 접근하기 위한 레퍼런스 설정
  @ViewChild("filePicker", { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  //new-offer.html에 있는 (imagePick)과 연결된 이벤트 객체
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera") || this.usePicker) {
      //카메라 사용 불가한 경우 파일 선택을 위해 클릭하여 이벤트를 발생시킨다.
      this.filePickerRef.nativeElement.click();
      return;
    }

    //사진을 가져온다. 옵션으로 설정한다.
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        //base64라는 것을 알려주는 앞 표현식을 넣는다.
        this.selectedImage = "data:image/jpeg;base64," + image.base64String;
        //이벤트 emit하여 string 값을 넘겨준다.
        this.imagePick.emit(this.selectedImage);
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if(!pickedFile){
      return;
    }
    const fr = new FileReader();
    
    //readAsDataURL이 완료된 이후 수행할 작업을 작성한다.
  fr.onload  = () => {
     const dataUrl = fr.result.toString();
     this.selectedImage = dataUrl;
     //이벤트 객체에 파일을 태워서 new-offer로 날린다.
     this.imagePick.emit(pickedFile);
  }
  //base64 Data를 가져온다.
  fr.readAsDataURL(pickedFile);
  }
}
