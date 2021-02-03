import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { SessionQuery } from "./session.query";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly session: SessionQuery,
    private readonly router: Router
  ) {
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.session.isLoaded().pipe(
      switchMap(isAuth => isAuth ? of(true) : this.router.navigate(["auth"]))
    );
  }

}
