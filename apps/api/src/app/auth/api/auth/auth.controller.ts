import { BadRequestException, Body, Controller, HttpException, Post } from "@nestjs/common";
import { defer, EMPTY, Observable, of, throwError } from "rxjs";
import { Repository } from "typeorm";
import { User } from "../../../db/entity/user";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDto, LoginRequestDto, ResetPasswordDto } from "@messenger/dto";
import { LoginService } from "./login.service";
import { RegisterService } from "./register.service";
import { catchError, mapTo, mergeMap, switchMap, tap } from "rxjs/operators";
import { TokenService } from "../token/token.service";
import { ForgetPasswordDto } from "@messenger/dto";
import { MailTransporterService } from "../../../mail/mail-transporter.service";

@Controller()
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly token: TokenService,
    private readonly mail: MailTransporterService
  ) {
  }

  @Post("login")
  public login(@Body() loginRequest: LoginRequestDto): Observable<{ token: string } | HttpException> {
    return this.loginService.authorize(loginRequest);
  }

  @Post("register")
  public register(@Body() registerRequest: RegisterRequestDto): Observable<void> {
    return this.registerService.createUserAndSendConfirmationEmail(registerRequest);
  }

  @Post("confirm-user")
  public verify(@Body() verifyRequest: { token: string }): Observable<void> {
    return this.token.verifyJWT(verifyRequest.token).pipe(
      mergeMap(({ email }: { email: string }) => this.userRep.findOne({ email })),
      tap(user => {
        if (user) {
          user.isConfirmed = true;
        }
      }),
      mergeMap(user => user ? this.userRep.save(user) : of(null)),
      mapTo(null),
      catchError(error => {
        throw new BadRequestException(error);
      })
    );
  }

  @Post("reset-password")
  public resetPassword(@Body() resetPasswordRequest: ResetPasswordDto): Observable<void> {
    // todo compare passwords
    const { token, newPassword, repeatNewPassword } = resetPasswordRequest;

    return this.token.verifyJWT<{ email: string }>(token).pipe(
      mergeMap(({ email }) => this.userRep.findOne({ email })),
      switchMap(user => {
        if (user) {
          user.password = newPassword;
          user.hashPassword();
          return this.userRep.save(user);
        }

        return throwError(new BadRequestException("Email is invalid"));
      }),
      mapTo(null),
      catchError(error => {
        throw new BadRequestException(error);
      })
    );
  }

  @Post("forget-password")
  public forgetPassword(@Body() forgetPasswordRequest: ForgetPasswordDto): Observable<void> {
    const { email } = forgetPasswordRequest;

    return defer(() => this.userRep.findOne({ email })).pipe(
      mergeMap(user => user ? this.handleForgetPasswordRequest(user) : EMPTY)
    );
  }

  private handleForgetPasswordRequest(user: User): Observable<void> {
    const expiresIn = "24h";
    const { email } = user;

    return this.token.createJWT({ email }, { expiresIn }).pipe(
      mergeMap(token => this.sendResetPasswordEmail(email, token))
    );
  }

  private sendResetPasswordEmail(email: string, token: string): Observable<void> {
    const host = "http://localhost:4200"; // todo add to env

    return this.mail.sendEmail({
      from: "\"limitofzero 👻\" <limitofzero2@gmail.com>",
      to: email,
      subject: "Hello ✔",
      text: "Reset password",
      html: `Reset password link: ${host}/auth/reset-password?reset-password-token=${token}` // html body
    });
  }
}
