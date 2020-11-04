import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { from, Observable, throwError } from "rxjs";
import { Repository } from "typeorm";
import { User } from "../../../db/entity/user";
import { map, mapTo, mergeMap } from "rxjs/operators";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDto, LoginRequestDto } from "@messenger/dto";
import * as jwt from "jsonwebtoken";
import { MailTransporterService } from "../../../mail/mail-transporter.service";

@Controller()
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly mail: MailTransporterService
  ) {
  }

  @Post("login")
  public login(@Body() loginRequest: LoginRequestDto): Observable<{ token: string } | HttpException> {
    const { password, email, rememberMe } = loginRequest;
    return from(this.userRep.findOne({ email }))
      .pipe(
        map(user => user?.isPasswordValid(password) ? this.returnToken(user, rememberMe) : null),
        map(token => {
          if (token) {
            return token;
          }

          return this.throwUserDoesntExist();
        })
      );
  }

  private returnToken(user: User, rememberMe: boolean): { token: string } {
    const { username, email } = user;
    const expiresIn = this.getExpiresIn(rememberMe);

    const token = jwt.sign({
        username,
        email
    }, process.env.SALT ?? "", { expiresIn });

    return { token };
  }

  private getExpiresIn(rememberMe: boolean): string {
    return rememberMe ? "30d" : "1h";
  }

  @Post("register")
  public register(@Body() registerRequest: RegisterRequestDto): Observable<void> {
    const { email, username } = registerRequest;
    return from(this.userRep.findOne({ email, username }))
      .pipe(
        map(user => !user ? this.userRep.create(registerRequest) : null),
        mergeMap(user => this.sendEmailAndSaveUser(user))
      );
  }

  private sendEmailAndSaveUser(user: User | null): Observable<void> {
    return (user ? this.sendVerificationEmail(user) : throwError(new HttpException("User was not created", 404))).pipe(
      mergeMap(() => this.userRep.save(user)),
      mapTo(null)
    );
  }

  private generateEmailVerificationToken(user: User): string {
    const { username } = user;
    const expiresIn = "24h";

    return jwt.sign({
      username
    }, process.env.SALT ?? "", { expiresIn });
  }

  private sendVerificationEmail(user: User): Observable<void> {
    const token = this.generateEmailVerificationToken(user);
    const host = "http://localhost:4200";
    const email = user.email;


    return this.mail.sendEmail({
      from: "\"limitofzero 👻\" <limitofzero@gmail.com>",
      to: email,
      subject: "Hello ✔",
      text: "You were registered!!!",
      html: `Verification link: ${host}/auth/confirmation?token=${token}` // html body
    });
  }

  private throwUserDoesntExist(): HttpException {
    return new HttpException("User with this email/password doesn't exist", HttpStatus.UNAUTHORIZED);
  }
}
