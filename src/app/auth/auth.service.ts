import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, from } from "rxjs";
import { User } from "./user.model";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  //토큰을 돌려받는다면 토큰이 존재하며, 유효기간 또한 맞으므로 true 리턴
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient) {}

  //스토리지에서 토큰을 찾아내, 적정하다면 유저를 갱신한 뒤, 참을 반환한다.
  autoLogin() {
    //promise를 observable로 변환해준다.
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        //스트링 값을 자바 객체로 변환해준다. as를 이용하여 어떤 객체로 변환되는지 알려준다.
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }), tap(user => {
        if(user){
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  //firebase의 Auth에 사인업한다.
  signup(email: string, password: string) {
    return (
      this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          { email: email, password: password, returnSecureToken: true }
        )
        //255강 4분 30초
        .pipe(tap(this.setUserData.bind(this)))
    );
  }
  //firebase의 Auth에 로그인한다.
  logIn(email: string, password: string) {
    return (
      this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          { email: email, password: password, returnSecureToken: true }
        )
        //255강 4분 30초
        .pipe(tap(this.setUserData.bind(this)))
    );
  }

  //유저 정보를 저장한 뒤 스토리지에도 저장한다.
  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  logOut() {
    this._user.next(null);
  }

  //스토리지에 유저와 토큰 정보를 저장한다.
  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    //자바 객체를 스트링 값으로 변환해준다.
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({ key: "authData", value: data });
  }
}
