import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
let AuthPage = class AuthPage {
    constructor(authService, router, loadingCtrl) {
        this.authService = authService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.isLoading = false;
        this.isLogin = true;
    }
    ngOnInit() { }
    onLogin() {
        this.isLoading = true;
        this.loadingCtrl
            .create({ message: "Logging in..", keyboardClose: true })
            .then(loadingEl => {
            loadingEl.present();
            this.authService.logIn();
            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl("places/tabs/discover");
            }, 1500);
        });
    }
    onSubmit(form) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);
        if (this.isLogin) {
        }
        else {
        }
    }
    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }
};
AuthPage = tslib_1.__decorate([
    Component({
        selector: "app-auth",
        templateUrl: "./auth.page.html",
        styleUrls: ["./auth.page.scss"]
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        Router,
        LoadingController])
], AuthPage);
export { AuthPage };
//# sourceMappingURL=auth.page.js.map