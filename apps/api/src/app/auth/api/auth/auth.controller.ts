import { BadRequestException, Body, Controller, HttpException, Post } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { Repository } from "typeorm";
import { User } from "../../../db/entity/user";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDto, LoginRequestDto, ResetPasswordDto } from "@messenger/dto";
import { LoginService } from "./login.service";
import { RegisterService } from "./register.service";
import { catchError, mapTo, mergeMap, tap } from "rxjs/operators";
import { TokenService } from "../token/token.service";
import { ForgetPasswordDto } from "@messenger/dto";
import { ResetPasswordService } from "./reset-password.service";

@Controller()
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly token: TokenService,
    private readonly resetPasswordService: ResetPasswordService
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
    const { token, newPassword, repeatNewPassword } = resetPasswordRequest;
    return this.resetPasswordService.resetPassword(token, newPassword, repeatNewPassword);
  }

  @Post("forget-password")
  public forgetPassword(@Body() forgetPasswordRequest: ForgetPasswordDto): Observable<void> {
    const { email } = forgetPasswordRequest;
    return this.resetPasswordService.sendResetPasswordLink(email);
  }
}
