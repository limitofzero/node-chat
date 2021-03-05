import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ForgetPasswordDto } from '@task-manager/dto';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'task-manager-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  public readonly form: FormGroup;
  public readonly resetPasswordEmail = new BehaviorSubject<string>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue: ForgetPasswordDto = this.form.value;
    this.auth.forgetPassword(formValue).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => this.resetPasswordEmail.next(formValue.email)
    });
  }
}
