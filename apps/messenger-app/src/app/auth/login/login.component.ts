import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

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
    private readonly auth: AuthService
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

    this.auth.signIn(this.form.value).pipe(
      untilDestroyed(this)
    ).subscribe();
  }
}
