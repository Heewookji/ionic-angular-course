import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from "@angular/core";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"]
})
export class MapModalComponent implements OnInit, AfterViewInit {

  @ViewChild('map', null) mapElementRef: ElementRef;

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) {}

  ngOnInit() {}

  //view 단이 출력 된 뒤 수행하는 메서드
  ngAfterViewInit(){
    //then에서 여러 메서드를 주는 구글맵 객체를 받는다.
    this.getGoogleMaps().then(googleMaps => {

      console.log('googleMap!' + googleMaps);
      //맵을 출력하고 싶은 앨리먼트 설정
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
      });
      //출력이 끝난 뒤에 visible 클래스를 추가해준다.
      googleMaps.event.addListenerOnce(map, 'idle', ()=> {
        this.renderer.addClass(mapEl, 'visible');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  private getGoogleMaps(): Promise<any>{

    //window 객체를 받는다.
    const win = window as any;
    const googleModule = win.google;

    //window에 구글모듈객체가 있다면 resolve 하여 리턴
    if(googleModule && googleModule.map){
      return Promise.resolve(googleModule.maps); 
    }

    //없다면 도큐멘트에 직접 스크립트를 넣어 resolve할 window의 맵객체를 만들어주고 프로미스를 리턴한다.
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3eIkzmwVRwekcE_U9I-ddI0VADJy7bJ0';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = ()=> {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps){
          resolve(loadedGoogleModule.maps);
        } else{
          //스크립트 작업 실패시
          reject('Google maps SDK not available!');
        }
      };
    })
  }


  onCancel() {
    this.modalCtrl.dismiss();
  }
}
