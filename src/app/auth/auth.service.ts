import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 private _userIsAuthenticated = true;
 private _userId = 'xyz';

  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  get userId(){
    return this._userId;
  }

  constructor() { }

  logIn(){
    this._userIsAuthenticated = true;
  }

  logOut(){
    this._userIsAuthenticated = false;
  }
}
