import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "messenger-reset-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent {
  public readonly form: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      email: fb.control("", [Validators.required, Validators.email])
    });
  }

  public onSubmit(): void {

  }
}
