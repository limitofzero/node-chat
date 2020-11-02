import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Router } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "messenger-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = fb.group({
      email: fb.control("", [Validators.required, Validators.email]),
      username: fb.control("", [Validators.required]),
      password: fb.control("", [Validators.required])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth.signUp(this.form.value).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => this.router.navigate([".."])
    });
  }
}
