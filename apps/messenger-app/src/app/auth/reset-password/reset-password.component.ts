import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth.service';

@UntilDestroy()
@Component({
  selector: 'messenger-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public token: Observable<string>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authApi: AuthService,
    private readonly router: Router
  ) {
    this.form = fb.group({
      newPassword: fb.control('', [Validators.required]),
      repeatNewPassword: fb.control('', [Validators.required])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const form: { newPassword: string, repeatNewPassword: string } = this.form.value;
    this.token.pipe(
      take(1),
      switchMap(token => this.authApi.resetPassword({ ...form, token })),
      switchMap(() => this.router.navigate(['..'])),
      untilDestroyed(this)
    ).subscribe();
  }

  public ngOnInit(): void {
    this.token = this.route.queryParams.pipe(
      map(params => params['reset-password-token'] as string ?? ''),
      shareReplay()
    );
  }
}
