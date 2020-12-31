import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginRequestDto } from "@messenger/dto";
import { Observable, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { User } from "../../../db/entity/user";
import { TokenService } from "../token/token.service";
import { UserService } from "./user.service";

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly token: TokenService
  ) {
  }

  public authorize(loginRequest: LoginRequestDto): Observable<{ token: string }> {
    const { password, email, rememberMe } = loginRequest;
    return this.userService.findOneBy({ email })
      .pipe(
        mergeMap(user => user?.isPasswordValid(password) ?
          this.returnToken(user, rememberMe) :
          throwError(new BadRequestException("User with this email/password doesn't exist"))
        ),
      );
  }

  private returnToken(user: User, rememberMe: boolean): Observable<{ token: string }> {
    const { username, email } = user;
    const expiresIn = this.getExpiresIn(rememberMe);

    return this.token.createJWT({ username, email }, { expiresIn }).pipe(
      map(token => ({ token })),
    );
  }

  private getExpiresIn(rememberMe: boolean): string {
    return rememberMe ? "30d" : "1h";
  }
}
