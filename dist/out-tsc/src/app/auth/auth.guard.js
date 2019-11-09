import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canLoad(route, segments) {
        if (!this.authService.userIsAuthenticated) {
            this.router.navigateByUrl('/auth');
        }
        return this.authService.userIsAuthenticated;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: "root"
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map