import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor() {
        this._userIsAuthenticated = true;
        this._userId = 'xyz';
    }
    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }
    get userId() {
        return this._userId;
    }
    logIn() {
        this._userIsAuthenticated = true;
    }
    logOut() {
        this._userIsAuthenticated = false;
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map