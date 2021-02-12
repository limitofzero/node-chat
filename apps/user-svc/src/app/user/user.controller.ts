import { Controller } from '@nestjs/common';

import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ConfirmEmailDto, CreateUserDto, ResetPasswordDto, User, VerifyUserDto } from '@messenger/user';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @GrpcMethod('UserService', 'VerifyUser')
  public verifyUser(user: VerifyUserDto): Observable<User> {
    return this.userService.verifyUser(user);
  }

  @GrpcMethod('UserService', 'CreateUser')
  public createUser(createUserDto: CreateUserDto): Observable<User> {
    return this.userService.createUser(createUserDto);
  }

  @GrpcMethod('UserService', 'ConfirmEmail')
  public confirmEmail(confirmEmailDto: ConfirmEmailDto): Observable<User> {
    return this.userService.confirmEmail(confirmEmailDto.email);
  }

  @GrpcMethod('UserService', 'ResetPassword')
  public resetPassword(resetPasswordDto: ResetPasswordDto): Observable<Record<string, unknown>> {
    return this.userService.resetPassword(resetPasswordDto);
  }
}
