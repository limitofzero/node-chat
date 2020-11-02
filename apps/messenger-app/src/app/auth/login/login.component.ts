import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SessionStore } from "../../session/session.store";
import { Router } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "messenger-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly session: SessionStore,
    private readonly router: Router
  ) {
    this.form = fb.group({
      email: fb.control("", [Validators.required, Validators.email]),
      password: fb.control("", [Validators.required]),
      rememberMe: fb.control(true)
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.session.setLoading(true);
    this.auth.signIn(this.form.value).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: ({ token }) => {
        this.session.update({ token });
        console.log("sess val: ", this.session.getValue());
        this.router.navigate(["../../"]);
      },
      complete: () => this.session.setLoading(false)
    });
  }
}
