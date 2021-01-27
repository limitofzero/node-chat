import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Router } from "@angular/router";
import { NotificationService } from "../../notifications/notification.service";
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { doWithLoading } from "@messenger/common";

@UntilDestroy()
@Component({
  selector: "messenger-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  public form: FormGroup;
  public captchaKey = environment.recaptchaKey;
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly notification: NotificationService
  ) {
    this.form = fb.group({
      email: fb.control("", [Validators.required, Validators.email]),
      username: fb.control("", [Validators.required]),
      password: fb.control("", [Validators.required]),
      recaptcha: fb.control("", [Validators.required])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    doWithLoading(this.auth.signUp(this.form.value), this.isLoading).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => {
        this.notification.show({ message: "You was registered" });
        this.router.navigate([".."]);
      }
    });
  }
}
