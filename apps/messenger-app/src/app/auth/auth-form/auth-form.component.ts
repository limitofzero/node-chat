import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map, shareReplay, startWith } from "rxjs/operators";

@Component({
  selector: "messenger-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"]
})
export class AuthFormComponent {
  public activeLink: Observable<string>;
  public links = [
    {
      label: "sign in",
      link: "sign-in"
    },
    {
      label: "sign up",
      link: "sign-up"
    }
  ];

  constructor(
    private readonly router: Router
  ) {
    this.activeLink = this.router.events.pipe(
      map(() => this.router.url),
      startWith(this.router.url),
      map(url => url.split("/")),
      map(split => split[split.length - 1]),
      map(lastPart => this.links.find(link => link.link === lastPart)),
      map(link => link?.link ?? ""),
      shareReplay()
    );
  }
}
