import { BadRequestException, Injectable } from "@nestjs/common";
import { defer, EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, mapTo, mergeMap } from "rxjs/operators";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../db/entity/user";
import { Repository } from "typeorm/index";
import { TokenService } from "../token/token.service";
import { MailService } from "../email/mail.service";

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly mail: MailService,
    private readonly token: TokenService
  ) {
  }

  public sendResetPasswordLink(email: string): Observable<void> {
    return defer(() => this.userRep.findOne({ email })).pipe(
      mergeMap(user => user ? this.handleForgetPasswordRequest(user) : EMPTY)
    );
  }

  public resetPassword(token: string, newPassword: string, repeatNewPassword: string): Observable<void> {
    return this.token.verifyJWT<{ email: string }>(token).pipe(
      catchError(error => {
        throw new BadRequestException(error);
      }),
      mergeMap(({ email }) => this.userRep.findOne({ email })),
      mergeMap(user => {
        if (user) {
          return of(user);
        }

        return throwError(new BadRequestException("Email is invalid"));
      }),
      mergeMap(user => {
        if (repeatNewPassword !== newPassword) {
          return throwError(new BadRequestException("Passwords fields are not equal"));
        }

        user.password = newPassword;
        user.hashPassword();
        return this.userRep.save(user);
      }),
      mapTo(null)
    );
  }

  private handleForgetPasswordRequest(user: User): Observable<void> {
    return this.mail.sendResetPasswordEmail(user);
  }
}
