import { Injectable } from "@nestjs/common";
import { MailTransporterService } from "../../../mail/mail-transporter.service";
import { User } from "../../../db/entity/user";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TokenService } from "../token/token.service";

@Injectable()
export class MailService {
  private readonly host = "http://localhost:4200"; // todo replace by env
  private readonly from = "\"limitofzero 👻\" <limitofzero2@gmail.com>";

  constructor(
    private readonly mail: MailTransporterService,
    private readonly token: TokenService
  ) {
  }

  public sendResetPasswordEmail(user: User): Observable<void> {
    const email = user.email;

    return this.generateToken(user, "20m").pipe(
      mergeMap(token => this.mail.sendEmail({
        from: this.from,
        to: email,
        subject: "Hello ✔",
        text: "You were registered!!!",
        html: `Reset password link: ${this.host}/auth/reset-password?reset-password-token=${token}`
      }))
    );
  }

  public sendVerificationEmail(user: User): Observable<void> {
    const email = user.email;

    return this.generateToken(user, "24h").pipe(
      mergeMap(token => this.mail.sendEmail({
        from: this.from,
        to: email,
        subject: "Hello ✔",
        text: "You were registered!!!",
        html: `Verification link: ${this.host}/auth/confirm-email?confirm-token=${token}`
      }))
    );
  }

  private generateToken(user: User, expiresIn: string): Observable<string> {
    const { email } = user;

    return this.token.createJWT({ email }, { expiresIn });
  }
}
