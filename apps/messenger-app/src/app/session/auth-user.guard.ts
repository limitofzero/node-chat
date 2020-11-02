import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { SessionQuery } from "./session.query";
import { switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly session: SessionQuery,
    private readonly router: Router
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.session.isLoaded().pipe(
      switchMap(isAuth => isAuth ? of(true) : this.router.navigate(["auth"]))
    );
  }

}
