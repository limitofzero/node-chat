import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../db/entity/user";
import { Repository } from "typeorm";
import { from, Observable, throwError } from "rxjs";
import { map, mapTo, mergeMap } from "rxjs/operators";
import { RegisterRequestDto } from "@messenger/dto";
import { MailTransporterService } from "../../../mail/mail-transporter.service";
import { TokenService } from "../token/token.service";

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly token: TokenService,
    private readonly mail: MailTransporterService
  ) {
  }

  public createUserAndSendConfirmationEmail(registerRequest: RegisterRequestDto): Observable<void> {
    const { email, username } = registerRequest;
    return from(this.userRep.findOne({ email, username }))
      .pipe(
        map(user => !user ? this.createUser(registerRequest) : null),
        mergeMap(user => this.sendEmailAndSaveUser(user))
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
    return (user ? this.sendVerificationEmail(user) : throwError(new BadRequestException("User was not created"))).pipe(
      mergeMap(() => this.userRep.save(user)),
      mapTo(null)
    );
  }

  private generateEmailVerificationToken(user: User): Observable<string> {
    const { email } = user;
    const expiresIn = "24h";

    return this.token.createJWT({ email }, { expiresIn });
  }

  private sendVerificationEmail(user: User): Observable<void> {
    const host = "http://localhost:4200"; // todo add to env
    const email = user.email;

    return this.generateEmailVerificationToken(user).pipe(
      mergeMap(token => this.mail.sendEmail({
        from: "\"limitofzero 👻\" <limitofzero2@gmail.com>",
        to: email,
        subject: "Hello ✔",
        text: "You were registered!!!",
        html: `Verification link: ${host}/auth/confirm-email?confirm-token=${token}` // html body
      }))
    );
  }
}
