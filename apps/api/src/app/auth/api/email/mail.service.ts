import { Injectable } from "@nestjs/common";
import { MailTransporterService } from "../../../mail/mail-transporter.service";
import { User } from "../../../db/entity/user";
import { Observable } from "rxjs";
import { mapTo, mergeMap } from "rxjs/operators";
import { TokenService } from "../token/token.service";
import { KeyValueStoreService } from "../redis/key-value-store.service";

@Injectable()
export class MailService {
  private readonly host = "http://localhost:4200"; // todo replace by env
  private readonly from = "\"limitofzero 👻\" <limitofzero2@gmail.com>";

  private id = 0;

  constructor(
    private readonly mail: MailTransporterService,
    private readonly token: TokenService,
    private readonly keyValueStore: KeyValueStoreService
  ) {
  }

  public sendResetPasswordEmail(user: User): Observable<void> {
    const email = user.email;
    this.id++;

    return this.generateToken(user, "20m").pipe(
      mergeMap(token => this.keyValueStore.set((this.id).toString(), token)
        .pipe(mapTo(this.id))
      ),
      mergeMap(key => this.mail.sendEmail({
        from: this.from,
        to: email,
        subject: "Hello ✔",
        text: "You were registered!!!",
        html: `Reset password link: ${this.host}/auth/reset-password?reset-password-token=${key}`
      })),
      mapTo(null),
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
