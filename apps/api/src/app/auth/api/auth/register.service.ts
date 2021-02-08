import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../db/entity/user';
import { Repository } from 'typeorm';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { RegisterRequestDto } from '@messenger/dto';
import { TokenService } from '../token/token.service';
import { CaptchaService } from '../captcha/captcha.service';
import { MailService } from '../email/mail.service';
import { UserService } from './user.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly token: TokenService,
    private readonly mail: MailService,
    private readonly captcha: CaptchaService
  ) {
  }

  public createUserAndSendConfirmationEmail(registerRequest: RegisterRequestDto): Observable<void> {
    const { email, username, recaptcha } = registerRequest;

    return this.captcha.validateCaptcha(recaptcha).pipe(
      mergeMap(() => this.userService.findOneBy({ email, username })),
      map(user => !user ? this.createUser(registerRequest) : null), // todo error
      mergeMap(user => this.sendEmailAndSaveUser(user)),
      catchError((err: any) => {
        return throwError(new BadRequestException(err));
      })
    );
  }

  public confirmUser(token: string): Observable<void> {
    return this.token.verifyJWT(token).pipe(
      mergeMap(({ email }: { email: string }) => this.userService.findOneBy({ email })),
      tap(user => {
        if (user) {
          user.isConfirmed = true;
        }
      }),
      mergeMap(user => user ? this.userService.save(user) : of(null)),
      mapTo(null),
      catchError(error => {
        throw new BadRequestException(error);
      })
    );
  }

  private createUser(request: RegisterRequestDto): User {
    const { username, email, password } = request;
    const user = new User();

    user.username = username;
    user.email = email;
    user.isConfirmed = false;
    user.password = password;
    user.hashPassword();

    return user;
  }

  private sendEmailAndSaveUser(user: User | null): Observable<void> {
    return (user ? this.mail.sendVerificationEmail(user) : throwError(new BadRequestException('User was not created'))).pipe(
      mergeMap(() => this.userService.save(user)),
      mapTo(null)
    );
  }
}
