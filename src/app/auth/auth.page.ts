import { Component, OnInit } from "@angular/core";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}


  //로그인과 사인업을 수행한다.
  authenticate(email: string, password: string) {
    this.isLoading = true;
    
    this.loadingCtrl
      .create({ message: "Logging in..", keyboardClose: true })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;

        //로그인일 경우와 사인업일 경우를 나눠서 Observable을 반환한다.
        if(this.isLogin){
          authObs = this.authService.logIn(email,password);
        } else{
          authObs = this.authService.signup(email, password);
        }
        
        authObs.subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl("places/tabs/discover");
        }, errRes => {
          console.log(errRes);
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign you up, please try again';
          if(code == 'EMAIL_EXISTS'){
            message = 'This email address already exists'
          } else if(code == 'EMAIL_NOT_FOUND'){
            message = 'E-mail address could not be found.';
          } else if (code == 'INVALID_PASSWORD'){
            message = 'This password is not correct.';
          }
          this.showAlert(message);
        });
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        message: message,
        header: "Authentication failed!",
        buttons: ["Okay"]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
