import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { take, tap, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}




  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap( isAuthenticated => {
        //유저를 증명못했다면 자동로그인 참거짓 확인
        if (!isAuthenticated) {
          return this.authService.autoLogin();
        } else{
          //유저를 증명했다면 참을 그냥 반환
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }
}
