import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisterRequestDto, LoginRequestDto, ResetPasswordDto, ConfirmEmailDto } from '@task-manager/dto';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { ForgetPasswordDto } from '@task-manager/dto';
import { ResetPasswordService } from './reset-password.service';

@Controller()
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly resetPasswordService: ResetPasswordService
  ) {
  }

  @Post('login')
  public login(@Body() loginRequest: LoginRequestDto): Observable<{ token: string } | HttpException> {
    return this.loginService.authorize(loginRequest);
  }

  @Post('register')
  public register(@Body() registerRequest: RegisterRequestDto): Observable<void> {
    return this.registerService.createUserAndSendConfirmationEmail(registerRequest);
  }

  @Post('confirm-user')
  public verify(@Body() verifyRequest: ConfirmEmailDto): Observable<void> {
    return this.registerService.confirmUser(verifyRequest.token);
  }

  @Post('reset-password')
  public resetPassword(@Body() resetPasswordRequest: ResetPasswordDto): Observable<void> {
    const { token, newPassword, repeatNewPassword } = resetPasswordRequest;
    return this.resetPasswordService.resetPassword(token, newPassword, repeatNewPassword);
  }

  @Post('forget-password')
  public forgetPassword(@Body() forgetPasswordRequest: ForgetPasswordDto): Observable<void> {
    const { email } = forgetPasswordRequest;
    return this.resetPasswordService.sendResetPasswordLink(email);
  }
}
