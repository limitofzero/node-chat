import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, finalize, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'task-manager-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmEmailComponent implements OnInit {
  public token: Observable<string>;
  public readonly loading = new BehaviorSubject<boolean>(true);
  public readonly error = new BehaviorSubject<string>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.token = this.route.queryParams.pipe(
      map(params => params['confirm-token'] as string ?? ''),
      shareReplay()
    );

    this.token.pipe(
      take(1),
      filter(token => !!token),
      switchMap(token => this.auth.confirmEmail(token)),
      finalize(() => this.loading.next(false)),
      untilDestroyed(this)
    ).subscribe({
      error: err => this.error.next(err.error.message)
    });
  }
}
